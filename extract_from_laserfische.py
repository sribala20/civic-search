import requests
import json
import boto3 
import time
from concurrent.futures import ThreadPoolExecutor
from concurrent.futures import as_completed
from botocore.exceptions import ClientError
from botocore.config import Config

S3_BUCKET = "dxhub-slo-city-public-data"
CHARS_PER_TOKEN = 3.5
MAX_TOKENS = 4096
REPO_NAME = "CityClerk"
CITY_URL = "opengov.slocity.org"
ROOT_FOLDER = 1
AGENDA_PACKETS_2023_FOLDER = 171041
AGENDA_CORRESPONDENCE_2023_MEETING = 171619 #2023-01-10 - Rescheduled Regular Meeting, entryId: 171619
SPEAKER_CARDS = "Speaker Cards"

def store_document_s3(bucket_name: str, s3_file_name: str, pages_of_content: list[str], document_id: int, template: dict) -> list:
    """
    Determine correct S3 parameters for a given file.

    :param bucket_name: Name of the S3 you want to upload your file.
    :param s3_file_name: Name of the file you want to upload to S3.
    :param pages_of_content: List of pages from the document.
    :param document_id: Document id for the document.
    :param template: JSON template for parsing.
    :return: List containing the parsed document, bucket_name, s3_file_name and document_id.
    """

    # Check for Speaker Cards
    if SPEAKER_CARDS in s3_file_name:
        print("Skipping Speaker Cards")
        return []
    
    contents = ""
    page_number = 0

    # Concatenate pages together with page number between pages
    for page in pages_of_content:
      contents += f"{page}"
      page_number += 1
      contents += f"\nPage {page_number}\n"
    
    # Create prompt 
    pre_prompt = "Human: Please take this document and parse out the information into this detailed JSON object structure"
    post_prompt = "For each section in the document, add it into its corressponding attribute in the JSON object. If a value doesn\'t apply or isn't present, please place null for that category. If you notice the documents contain a new attribute that doesn’t fit the example JSON template, please add a ‘Misc’ attribute at the end of the JSON template and store the attribute(s) there. (RETURN ONLY THE JSON OBJECT AND NOTHING ELSE)"
    prompt = [pre_prompt, post_prompt]

    # Check if prompt fits within our token limit
    full_length_prompt = make_prompt(prompt, template, contents)
    if fits_token_limit(full_length_prompt):
        # Parse document into JSON format
        response = parse_document(contents, template, prompt)
        if response:
            # Extract json from LLM response
            json_string_without_path = extract_json_from_response(response)
            
            # Add url to JSON object
            parsed_json = add_path_to_json(json_string_without_path, document_id, full_length_prompt)

            if parsed_json:
                return [bucket_name, s3_file_name, parsed_json, document_id, contents]
            
            else:
                # JSON parsing failed
                print(f"Parsing failed for doc {document_id}")
                # Log errored doc id
                with open("failed_documents.txt", "a") as errors:
                    errors.write(f"{document_id} ")
                return []
        else:
            # No LLM response
            print(f"Empty response with document id: {document_id}, document name: {s3_file_name}")
            # Log errored doc id
            with open("failed_documents.txt", "a") as errors:
                errors.write(f"{document_id} ")
            return []
    else:
        # Document exceeded token limit
        print(f"Document with document_id: {document_id} and document name: {s3_file_name} exceeds the token limit for this LLM")
        # Log errored doc id
        with open("failed_documents.txt", "a") as errors:
            errors.write(f"{document_id} ")
        return []


def store_document_s3_thread(bucket_name: str, s3_file_name: str, content: str) -> None:
    """
    Upload a document to S3.

    :param bucket_name: Name of S3 Bucket.
    :param s3_file_name: File name to be used for uploading.
    :content: Content to be uploaded.
    :return: None
    """

    # Create a client for the AWS S3 service
    s3_client = boto3.client('s3')

    # Add json extension to file_name
    if s3_file_name[-1] == '.':
        # If file name ends with period, add the json extension without the period to avoid s3 naming error
        s3_file_name += "json"
    else:
        # File name didn't end with period, add the period and json extension
        s3_file_name += '.json'

    try:
        s3_client.put_object(Bucket=bucket_name, Key=s3_file_name, Body=content)
        print(f"Document uploaded to S3 bucket '{bucket_name}' with file name '{s3_file_name}'")
    except Exception as e:
        print(f"Failed to upload to S3: {e}")


def extract_json_from_response(response: str) -> str:
    """
    Extracts JSON from LLM response containing JSON and other text.

    :param response: The response you want to parse.
    :return: JSON string from response.
    """

    # Find the first curly brace
    start_json = response.find('{')
    # Find the last curly brace
    end_json = response.rfind('}') + 1
    # Check for failure of find and rfind
    if (start_json != -1 and end_json != -1): 
        # Return response between those indices
        return response[start_json:end_json]

def invoke_llm(prompt) -> str:
    """
    Invokes Anthropic Claude 3 Sonnet to run inference using the input
    provided in the request body.

    :param prompt: The prompt that you want Claude 3 to complete.
    :return: Inference response from the model.
    """

    # Increase read timeout to avoid early timeouts
    config = Config(read_timeout=1000)
    
    # Increase token limit
    max_tokens = MAX_TOKENS

    # Set parameters
    temperature = 0
    top_p = 1


    # Initialize the Amazon Bedrock runtime client
    client = boto3.client(
        service_name="bedrock-runtime"
        )
    

    # Invoke Claude 3 with the text prompt
    model_id = "anthropic.claude-3-sonnet-20240229-v1:0"

    try:
        response = client.invoke_model(
            modelId=model_id,
            body=json.dumps(
                {
                    "anthropic_version": "bedrock-2023-05-31",
                    "max_tokens": max_tokens,
                    "temperature": temperature,
                    "top_p": top_p,
                    "stop_sequences": ["\n\nHuman:"],

                    "messages": [
                        {
                            "role": "user",
                            "content": [{"type": "text", "text": prompt}],
                        }
                    ],
                }
            ),
        )

        # Process the response
        result = json.loads(response.get("body").read())
        output_list = result.get("content", [])

        # We only expect one response, get the first one
        output = output_list[0]

        return output["text"]

    # Handle error
    except ClientError as err:
        # print(f"{err.response["Error"]["Code"]}: {err.response["Error"]["Message"]}")
        return ""


def parse_document(document: str, template: dict, prompt_text: list[str]) -> str:
    """
    Invokes LLM with a specified prompt and document.

    :param document: Document you want to pass to LLM.
    :param template: One-shot JSON template to pass to LLM.
    :param prompt_text: Prompt to be passed to LLM before and after the document.
    :return: LLM's response to prompt
    """

    prompt = make_prompt(prompt_text, template, document)
    response = invoke_llm(prompt)
    return response

def make_prompt(prompt_list, template, document) -> str:
    """
    Creates the full prompt to be passed to the LLM.
    
    :param prompt_list: List of the prompts to be passed before and after the template,
    :param template: One-shot JSON template for the LLM to use as a format.
    :param document: Document you would like to parse.
    :return: Prompt containing all relevant information in the correct format.
    """

    # Tags needed to invoke Claude
    human_tag = "Human: "
    assistant_tag = "Assistant:"

    # Format prompt
    pre_prompt, post_prompt = prompt_list
    prompt = f"{document}\n\n{human_tag}{pre_prompt}\n\n{template}\n\n{post_prompt}\n\n{assistant_tag}"

    return prompt


def add_path_to_json(json_string: str, document_id: int, original_prompt: str) -> json:
    """
    Add a URL referencing the original document to a JSON object

    :param json_string: JSON string to add URL to.
    :param document_id: ID of the document represented by the JSON object.
    :param original_prompt: Prompt used to create JSON object.
    :return: JSON object with URL.
    """

    try:
        # Convert JSON to dict
        parsed_dict = json.loads(json_string)

        # Create and add URL
        url = f"{CITY_URL}/WebLink/DocView.aspx?id={document_id}&dbid=0&repo={REPO_NAME}"
        parsed_dict['URL'] = url

        print(f"Added url to {extract_document_path(document_id)}")

        # Return JSON object in proper format
        return json.dumps(parsed_dict, indent=4, separators=(',',': '))
    
    except ValueError as e:
        # Converting to JSON failed
        print("Not Valid JSON, attempting to reformat")
        with open("json_errors.txt", "a") as file:
            file.write(f"{e}\n{json_string}\n")
        
        # Reformat JSON
        parsed_dict = format_json(json_string, original_prompt, e)

        if parsed_dict:
            # Create and add URL
            url = f"{CITY_URL}/WebLink/DocView.aspx?id={document_id}&dbid=0&repo={REPO_NAME}"
            parsed_dict['URL'] = url

            print(f"Added url to {extract_document_path(document_id)}")

            # Return JSON object in proper format
            return json.dumps(parsed_dict, indent=4, separators=(',',': '))
        
        # Reformatting failed
        else:
            # Log error
            with open("failed_documents.txt", "a") as errors:
                errors.write(f"{document_id} ")   


def format_json(misformatted_json: str, prompt: str, error) -> json:
    """
    Reformats a misformatted JSON string by invoking an LLM

    :param misformatted_json: The misformatted JSON string.
    :param prompt: The original prompt used to create that string.
    :param error: The error associated with attempting to convert that string into JSON
    :return: None on Failure, JSON object on success
    """

    prompt = f"Human: This is my original prompt. {prompt}\n{misformatted_json}\nThis is the error: {error}\n. Make sure to close all brackets and all closing braces at the end of the object. Fix all formatting issues and return the new json object\n\nAssistant:"
    
    response = invoke_llm(prompt)

    if response:
        try:
            # Convert response into JSON
            parsed_response = extract_json_from_response(response)
            parsed_dict = json.loads(parsed_response)
            return parsed_dict
        except ValueError as e: 
            # Parsing failed, error handled in parent
            return None
    else:
        # Bad LLM response
        return None
    

def extract_document_data(document_id: int, num_pages: int) -> list[str]:
    """
    Extract given number of text pages from a given document.

    :param document_id: ID of the document to be extracted.
    :param num_pages: The number of pages you would like to extract.
    :return: A list containing the text for each page.
    """

    pages = [] 
    
    # Extract each page
    for current_page in range(1, num_pages + 1): 

        web_url = f'https://{CITY_URL}/WebLink/DocumentService.aspx/GetTextHtmlForPage'
        body={"repoName": REPO_NAME, "documentId": document_id, "pageNum": current_page, "showAnn": "true", "searchUuid": ""} 

        try:
            response = requests.post(web_url, json=body)
            # Check for error
            response.raise_for_status()

            # Check for empty response
            if response:   
                # Add page to our list
                text_response = json.loads(response.text)
                pages.append(text_response['data']['text']) 

            else:
                # Page was empty, continue looking for pages
                print(f"Empty Page {response}") 

        except Exception as e:                            
            print(e)
            return []
        
    return pages


def process_folder_recursively(folder_id: int, template: dict, documents: list) -> list:  
    """
    Given a folder, add all its descendants to a list for processing.

    :param folder_id: Root folder to recurse upon.
    :param template: JSON template for the root and descendants.
    :documents: List for queuing documents.
    :return: List containing all necessary parameters for all descendants to be uploaded.
    """
    
    # Skip Agenda Correspondence
    if folder_id == AGENDA_CORRESPONDENCE_2023_MEETING:
        print("Skipping agenda correspondence 2023 meeting")
        return
    
    # Get all children
    items = get_items(folder_id)

    ITEM_NAME = 0
    ITEM_ENTITY_ID = 1

    # Extract all documents at each level of the directory
    for item in items:
        if is_document(int(item[ITEM_ENTITY_ID])):

            # Extract relevant document info
            print(f"Extracting data from {item[ITEM_NAME]}")
            num_pages = get_num_pages(int(item[ITEM_ENTITY_ID])) 
            pages_of_content = extract_document_data(int(item[ITEM_ENTITY_ID]), num_pages)

            if pages_of_content != []: 
                # Determine s3_location
                s3_location = f"{REPO_NAME}/{extract_document_path(item[ITEM_ENTITY_ID])}"

                # Add document parameters to our queue for processing
                documents.append([S3_BUCKET, s3_location, num_pages, pages_of_content, int(item[ITEM_ENTITY_ID]), template]) 

            else:
                # Empty document
                print(f"Document contained no data {item[ITEM_NAME]}")

        else:
            # Recurse on sub folder
            print(f"Sub folder found {item[ITEM_NAME]}")
            print(f"Processing sub folder {item[ITEM_ENTITY_ID]}")
            process_folder_recursively(item[ITEM_ENTITY_ID], template, documents)
    
    return documents


def is_document(entry_id: int) -> bool:
    """
    Determine if an entry_id represents a document.

    :param entry_id: ID of the entry we want to check.
    :return: Boolean representing whether our entry_id is a document.
    """

    web_url = f'https://{CITY_URL}/WebLink/DocumentService.aspx/GetTextHtmlForPage'
    body={"repoName": REPO_NAME, "documentId": entry_id, "pageNum": "1", "showAnn": "true", "searchUuid": ""}

    response = requests.post(web_url, json=body) 

    # API call succeeds on document, fails on folders
    return response.ok                               

def get_num_pages(document_id: int) -> int:
    """
    Determine the number of pages in a document.

    :param document_id: ID representing the document.
    :return: Number of pages in the document.
    """

    web_url = f'https://{CITY_URL}/WebLink/DocumentService.aspx/GetBasicDocumentInfo'
    body={"repoName": REPO_NAME, "entryId": document_id}

    response = requests.post(web_url, json=body)      
    
    # Check for errors
    response.raise_for_status()                         

    text_response = json.loads(response.text)
    return text_response['data']['pageCount']           


def extract_document_path(document_id: int):
    """
    Determines the full laserfiche path of a document.
    :param document_id: The document id of the document you want to determine.
    :return: The full path of the document.
    """

    # API url for request
    web_url = f'https://{CITY_URL}/Weblink/DocumentService.aspx/GetBasicDocumentInfo'
    
    # Body of the request
    body={"repoName": REPO_NAME, "entryId": document_id}

    response = requests.post(web_url,json=body)

    # Check for failure
    response.raise_for_status()
    
    # Extract path
    text_response = json.loads(response.text)
    path = text_response['data']['metadata']['path'] 

    # Forward slashes only appear in the document name, 
    # Replace all forward slashes with dashes
    path = path.replace('/', '-') 

    path = path.replace('\\', '/') 

    path = path[1::]
    return path

def get_items(folder_id: int) -> list[list]:
    """
    Extract all children of a given folder.

    :param folder_id: ID of the folder you would like to extract from.
    :return: List of lists containing the name and ID of each of the children.
    """

    items = []                      
    
    # API Paramters
    web_url = f"https://{CITY_URL}/WebLink/FolderListingService.aspx/GetFolderListing2"
    body={"repoName": REPO_NAME, "folderId": folder_id, "getNewListing": "true", 
          "start": 0, "end": 40, "sortColumn": "", "sortAscending": "true"}
    
    # Check if our folder_id truly represents a folder
    if not is_document(folder_id):      
        response = requests.post(web_url, json=body)       

        # Check for error
        response.raise_for_status()                      
        text_response = json.loads(response.text)           
        
        # Extract list of children
        data_response = text_response['data']['results']    
        if data_response != None:
            # Add each child to our list
            for data_entry in data_response:                          
                if data_entry:                                        
                    name = data_entry['name']
                    entryId = data_entry['entryId']
                    items.append([name, str(entryId)])

    return items


def fits_token_limit(prompt: str) -> bool:
    """
    Determines if a prompt fits in the token limit of our LLM.

    :param prompt: The prompt that you want to check.
    :return: Boolean representing whether the prompt fits in the token limit.
    """

    count = len(prompt)

    # Determine number of tokens in the string
    num_tokens = int(count // CHARS_PER_TOKEN)

    return num_tokens <= MAX_TOKENS

def run_threads(document_params: list):
    """
    Upload all documents to S3 in parallel.

    :param document_params: The list of parameters for each document to be passed to the executor.
    :return: None
    """

    # Constants
    BUCKET_NAME = 0
    S3_LOCATION = 1
    PAGES_OF_CONTENT = 3
    DOC_ID = 4
    TEMPLATE = 5    

    completed_docs = 1
    threads = []

    # Create threads
    with ThreadPoolExecutor(max_workers=40) as executor:
        for params in document_params:
            # Start each thread with correct parameters
            threads.append(executor.submit(store_document_s3, params[BUCKET_NAME], params[S3_LOCATION], 
                                params[PAGES_OF_CONTENT], params[DOC_ID], params[TEMPLATE]))
            
            # Log started documents
            with open("started_jobs.txt", "a") as started_jobs:
                started_jobs.write(f"{params[DOC_ID]} ")
    
        # Process threads as they are completed
        for finished in as_completed(threads):
            # return structure of store_document_s3:
                #[bucket_name, s3_file_name, parsed_json, document_id, contents]
            ret_val = finished.result()
            if ret_val != []:
                # Extract return values from thread
                bucket_name = ret_val[BUCKET_NAME]
                s3_file_name = ret_val[S3_LOCATION]
                parsed_json = ret_val[2]
                document_id = ret_val[3]
                original_doc = ret_val[4]

                # Upload document
                store_document_s3_thread(bucket_name, s3_file_name, parsed_json)
                print(f"Processed record #{completed_docs}")

                # Store document for evaluation
                with open('evals.txt', 'a') as evals:
                    evals.write(f"{original_doc} {parsed_json}\n")

                completed_docs += 1

                # Log document as completed
                with open("finished_jobs.txt", "a") as finished_jobs:
                    finished_jobs.write(f"{document_id} ") # write all our successful jobs to a file
            else:
                print(f"Empty response, no document found")

def determine_fails() -> None:
    """
    Determine failed documents and writes them to a log file

    :return: None
    """

    started_ids, finished_ids = set(), set()

    # add all doc ids to started set
    with open("started_jobs.txt", "r") as started_jobs:

        # Extract doc ids from started_jobs file
        lines = started_jobs.readlines()
        # Format line into list of doc_ids
        new_lines = [line.strip('\n').split() for line in lines]
        for line in new_lines:
            started_ids.update(line)
        

    # add all doc ids to finished set
    with open("finished_jobs.txt", "r") as finished_jobs:
        # Extract doc ids from finished_jobs file
        lines = finished_jobs.readlines()

        # Format line into list of doc_ids
        formatted_lines = [line.strip('\n').split() for line in lines]

        for line in formatted_lines:
            finished_ids.update(line)
    
    # Doc_ids that started but haven't finished have failed
    error_ids = started_ids.difference(finished_ids) 
    
    # Write failed ids to our error file
    with open("failed_documents.txt", "a") as failed_docs:
        for error_id in error_ids:
            failed_docs.write(f"{error_id} ")


def parse_folders(config_path):
    """
    Parses and uploads all folders to S3 for each entry in the config file.

    :param config_path: Path of the config file where each entry represents a doctype in laserfiche.
    :return: None
    """

    with open(config_path) as file:
        try:
            config_file = json.load(file)
            # Process each entry in the config file
            for template_name, template_entry in config_file['templates'].items():
                # Process folder
                print(f"Processing {template_name}")
                folder_id = template_entry['folder_id']
                template_object = template_entry['template']

                # Retrieve documents
                print(f"Adding documents to queue")
                documents = process_folder_recursively(folder_id, template_object, []) 
                        
                # Upload all documents
                print(f"Parsing and uploading documents")
                run_threads(documents)

        except Exception as e:
            print(e)
            return None


if __name__ == "__main__":
    start_time = time.time()
    parse_folders('/Users/taran/zHackathon/civic-search/frontend/config.json')
    print("Uploaded to S3 successfully")
    end_time = time.time() - start_time
    print(f"Program took {end_time} seconds to complete")

import { AnthropicBedrock } from "@anthropic-ai/bedrock-sdk";
import AWS from "aws-sdk";

// Initialize S3 client
const s3 = new AWS.S3();
// Initialize the Claude 3 API client
const client = new AnthropicBedrock();

export async function generateContentFromJSON(jsonContent, userSearchQuery) {
  try {
    // // Remove 's3://' prefix and split the rest into parts
    // const pathParts = s3FilePath.replace('s3://', '').split('/');
    // const bucketName = pathParts.shift();
    // const jsonFileKey = pathParts.join('/');

    // // Download the JSON file from S3
    // const params = {
    //     Bucket: bucketName,
    //     Key: jsonFileKey
    // };
    // const data = await s3.getObject(params).promise();
    // const jsonContent = JSON.parse(data.Body.toString());

    // Define the system prompt
    const systemPrompt = `Your task is to take the provided city council document in a PDF form and create a concise summary that captures the essential information, focusing on key takeaways, and tailoring your response based on the user search query which is attached at the end. Use clear and professional language, and organize the summary in a logical manner using appropriate formatting. Ensure the summary balances the need to be easily and quickly digestible, but also is a sufficient overview of the document's content, with a particular focus on how it relates to the user's search. Do not use colons in the summary, only use it for formatting title and information. Avoid saying things like this document appears, or this matches your search via. Just provide the information.

    Summary sentence 1 should be a high level overview, sentence 2 should be notable information present in the document, sentence 3 should be information in it directly related to the search.
    
    The format should provide a title based on the file content, followed by a colon, followed by a summary. The words title and summary should not be used.
    
    User search request: ${userSearchQuery}`
    
    // Prepare the payload for the Claude 3 API using the Sonnet model
    const msg = await client.messages.create({
      model: "anthropic.claude-3-sonnet-20240229-v1:0", // **Ensure this model version is correct and available**
      max_tokens: 4000, // **Adjust the max_tokens based on your needs**
      temperature: 0.5, // **Set the temperature as per the use-case requirement**
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: jsonContent,
            },
          ],
        },
      ],
    });

    return msg.content[0].text;
  } catch (error) {
    console.error("Error generating content:", error);
  }
}

// Example usage
// const s3FilePath = 's3://your-bucket-name/path/to/your/input.json';

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
    const systemPrompt = `Your task is to take the provided city council document in a JSON form and create a concise summary that captures the essential information, focusing on key takeaways, and tailoring your response based on the user search query which is attached at the end. Use clear and professional language, and organize the summary in a logical manner using appropriate formatting. Ensure the summary balances the need to be easily and quickly digestible, but also provides a sufficient overview of the document's content, with a particular focus on how it relates to the user's search. Only use colons for formatting the title and its associated information.

    Format the response with a title based on the file content, followed by a colon and the summary.
    
    The summary should be in one paragraph that reads naturally, limited to a maximum of 3 sentences:
    
    Sentence 1 should provide a high-level overview.
    
    Sentence 2 should highlight notable information present in the document.
    
    Sentence 3 should focus on information directly related to the search query.
    
    Do not start with anything, just jump in and return the title & summary. Do not put tags or anything, just follow the system prompt exactly.
    
    User search request:
     ${userSearchQuery}`;

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

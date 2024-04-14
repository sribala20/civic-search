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
    const systemPrompt = `<system><task>Your task is to take the provided city council document in JSON format and create a concise summary that captures the essential information. Focus on key takeaways, tailoring your response based on the attached user search query: ${userSearchQuery}. Use clear and professional language and organize the summary in a logical manner using appropriate formatting. Ensure the summary balances the need to be easily and quickly digestible, but also provides a sufficient overview of the document's content, particularly in relation to the user's search query. Avoid using colons in the summary, except for formatting titles and informational headings.</task><formatting_guidelines>Do not use colons in the summary content; use them only for formatting titles and informational headings.</formatting_guidelines><example>Title: <title>(Official PDF title if provided, create one that mirrors City Document if not)</title>Summary: <sentence1>High-level overview of the document.</sentence1><sentence2>Any notable details or information.</sentence2><sentence3>How it relates to the search query.</sentence3>*Note: If specific information related to the user's search is not found, adjust the response accordingly without explicitly stating the inability to find specific information. Always provide the most relevant information available.*</example></system>Tailer to following user search query: ${userSearchQuery}`;

    // Prepare the payload for the Claude 3 API using the Sonnet model
    const msg = await client.messages.create({
      model: "anthropic.claude-3-opus-20240229-v1:0", // **Ensure this model version is correct and available**
      max_tokens: 4000, // **Adjust the max_tokens based on your needs**
      temperature: 0.5, // **Set the temperature as per the use-case requirement**
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: JSON.stringify(jsonContent),
            },
          ],
        },
      ],
    });

    console.log("Generated content:", msg);
    return msg;
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

// Example usage
// const s3FilePath = 's3://your-bucket-name/path/to/your/input.json';

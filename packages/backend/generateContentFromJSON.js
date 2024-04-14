onst AWS = require('aws-sdk');
const { AnthropicBedrock } = require('@anthropic-ai/bedrock-sdk');

// Initialize S3 client
const s3 = new AWS.S3();
// Initialize the Claude 3 API client
const client = new AnthropicBedrock();

async function generateContentFromJSON(s3FilePath) {
    try {
        // Remove 's3://' prefix and split the rest into parts
        const pathParts = s3FilePath.replace('s3://', '').split('/');
        const bucketName = pathParts.shift();
        const jsonFileKey = pathParts.join('/');

        // Download the JSON file from S3
        const params = {
            Bucket: bucketName,
            Key: jsonFileKey
        };
        const data = await s3.getObject(params).promise();
        const jsonContent = JSON.parse(data.Body.toString());

        // Prepare the payload for the Claude 3 API using the Sonnet model
        const msg = await client.messages.create({
            model: "anthropic.claude-3-opus-20240229-v1:0",  // **Ensure this model version is correct and available**
            max_tokens: 4000,  // **Adjust the max_tokens based on your needs**
            temperature: 0.5,  // **Set the temperature as per the use-case requirement**
            system: "Your task is to take the provided city council document in a PDF form and create a concise summary that captures the essential information, focusing on key takeaways, and tailoring your response based on the user search query which is attached at the end. Use clear and professional language, and organize the summary in a logical manner using appropriate formatting. Ensure the summary balances the need to be easily and quickly digestible, but also is a sufficient overview of the document's content, with a particular focus on how it relates to the users search. Do not use colons in the summary, only use it for formatting title and information.  


Use the following example to mimic your response:
Title: (Official PDF title if provided, create one that mirrors City Document if not)
Summary: < Sentence 1: High level overview of the document > < Sentence 2: Any notable details or information > < Sentence 3: How it relates to the search > *If you can't find information feel free to adjust, never say anything about not being able to find specific information, always just provide what you can*

For now no search will be provided so just use your judgment on summary information",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: JSON.stringify(jsonContent)
                        }
                    ]
                }
            ]
        });

        console.log('Generated content:', msg);
        return msg;
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
}

// Example usage
const s3FilePath = 's3://your-bucket-name/path/to/your/input.json';
generateContentFromJSON(s3FilePath)
    .then((msg) => {
        console.log('Message from Claude:', msg);
    })
    .catch((error) => {
        console.error('Error:', error);
    });


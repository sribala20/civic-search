const AWS = require('aws-sdk');
const fs = require('fs');
const axios = require('axios');

// Initialize S3 client
const s3 = new AWS.S3();

async function generateContentFromJSON(s3FilePath) {
    try {
        // Extract bucket name and file key from the S3 file path
        const [bucketName, jsonFileKey] = s3FilePath.replace('s3://', '').split('/');
        const localJsonFilePath = '/tmp/input.json'; // Temporary local path

        // Download the JSON file from S3
        const params = {
            Bucket: bucketName,
            Key: jsonFileKey
        };
        const data = await s3.getObject(params).promise();
        fs.writeFileSync(localJsonFilePath, data.Body);

        // Read the JSON content
        const jsonContent = JSON.parse(data.Body.toString());

        // Construct the API request to Claude 3 Sonnet
        const claude3Url = 'https://api.claude3.com/generate';
        const prompt = "Please take this plain-text document and produce an answer that follows the format of a plain-text document the following format. Do the following tasks on the same line, placing colons between each answer. Create a clear and concise title for the document. Create a three to five-sentence summary of the document's contents. State the original name of the document.";
        const requestBody = {
            text: JSON.stringify(jsonContent),
            prompt: prompt,
        };

        // Make a POST request to Claude 3 Sonnet API
        const response = await axios.post(claude3Url, requestBody);
        const generatedContent = response.data.generated_text;

        return generatedContent;
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
}

// Example usage
const s3FilePath = 's3://your-bucket-name/path/to/your/input.json';
generateContentFromJSON(s3FilePath)
    .then((outputTxtFilePath) => {
        console.log('Generated content saved to', outputTxtFilePath);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

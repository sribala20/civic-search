import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import { BedrockAgentRuntimeClient, RetrieveCommand } from "@aws-sdk/client-bedrock-agent-runtime";

const app = express()
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cors())
const port = 8000

const client = new BedrockAgentRuntimeClient({ region: 'us-east-1' })

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!')
})

app.post('/retrieve', async (req, res) => {
  const knowledgeBaseId = 'U03XIQYOWK'
  const input = {
    knowledgeBaseId: knowledgeBaseId,
    retrievalQuery: {
      text: req.body.text,
    },
    // Add other parameters as needed
  };

  const command = new RetrieveCommand(input);

  try {
    const response = await client.send(command);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log('REST API is listening on http://localhost:8000')
})


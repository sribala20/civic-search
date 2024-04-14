import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import uploadRouter from "./upload.js";

import {
  BedrockAgentRuntimeClient,
  RetrieveCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";
import { generateContentFromJSON } from "./generateContentFromJSON.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/api/v1/upload/", uploadRouter);

const port = 8000;

const client = new BedrockAgentRuntimeClient({ region: "us-east-1" });

app.get("/", (req, res) => {
  res.status(200).send("Hello, world!");
});

app.post("/retrieve", async (req, res) => {
  const knowledgeBaseId = "U03XIQYOWK";
  const input = {
    knowledgeBaseId: knowledgeBaseId,
    retrievalQuery: {
      text: req.body.text,
    },
    vectorSearchConfiguration: {
      numberOfResults: 5,
    },
  };

  const command = new RetrieveCommand(input);

  try {
    const response = await client.send(command);
    const summaries = await Promise.all(
      response.retrievalResults.map((result) => {
        return generateContentFromJSON(result.content.text, req.body.text);
      })
    );

    const summariesWithMessage = summaries.map((summary, index) => {
      const uri = response.retrievalResults[index].location.s3Location.uri;
      const prefix = "s3://city-records-and-transcripts/CityClerk/";
      const cleanedUri = uri.substring(prefix.length);
      return "Laserfische Location: " + cleanedUri + ":\n" + summary;
    });

    res.json(summariesWithMessage);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.listen(process.env.PORT || port, () => {
  console.log("REST API is listening on http://localhost:8000");
});

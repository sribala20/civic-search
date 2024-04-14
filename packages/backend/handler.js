
import { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } from "@aws-sdk/client-bedrock-agent-runtime"; // ES Modules import
// const { BedrockAgentRuntimeClient, RetrieveAndGenerateCommand } = require("@aws-sdk/client-bedrock-agent-runtime"); // CommonJS import
const client = new BedrockAgentRuntimeClient(config);
const input = { // RetrieveAndGenerateRequest
  sessionId: "STRING_VALUE",
  input: { // RetrieveAndGenerateInput
    text: "STRING_VALUE", // required
  },
  retrieveAndGenerateConfiguration: { // RetrieveAndGenerateConfiguration
    type: "KNOWLEDGE_BASE", // required
    knowledgeBaseConfiguration: { // KnowledgeBaseRetrieveAndGenerateConfiguration
      knowledgeBaseId: "STRING_VALUE", // required
      modelArn: "STRING_VALUE", // required
      retrievalConfiguration: { // KnowledgeBaseRetrievalConfiguration
        vectorSearchConfiguration: { // KnowledgeBaseVectorSearchConfiguration
          numberOfResults: Number("int"),
          overrideSearchType: "HYBRID" || "SEMANTIC",
          filter: { // RetrievalFilter Union: only one key present
            equals: { // FilterAttribute
              key: "STRING_VALUE", // required
              value: "DOCUMENT_VALUE", // required
            },
            notEquals: {
              key: "STRING_VALUE", // required
              value: "DOCUMENT_VALUE", // required
            },
            greaterThan: {
              key: "STRING_VALUE", // required
              value: "DOCUMENT_VALUE", // required
            },
            greaterThanOrEquals: {
              key: "STRING_VALUE", // required
              value: "DOCUMENT_VALUE", // required
            },
            lessThan: {
              key: "STRING_VALUE", // required
              value: "DOCUMENT_VALUE", // required
            },
            lessThanOrEquals: "<FilterAttribute>",
            in: "<FilterAttribute>",
            notIn: "<FilterAttribute>",
            startsWith: "<FilterAttribute>",
            andAll: [ // RetrievalFilterList
              {//  Union: only one key present
                equals: "<FilterAttribute>",
                notEquals: "<FilterAttribute>",
                greaterThan: "<FilterAttribute>",
                greaterThanOrEquals: "<FilterAttribute>",
                lessThan: "<FilterAttribute>",
                lessThanOrEquals: "<FilterAttribute>",
                in: "<FilterAttribute>",
                notIn: "<FilterAttribute>",
                startsWith: "<FilterAttribute>",
                andAll: [
                  "<RetrievalFilter>",
                ],
                orAll: [
                  "<RetrievalFilter>",
                ],
              },
            ],
            orAll: [
              "<RetrievalFilter>",
            ],
          },
        },
      },
      generationConfiguration: { // GenerationConfiguration
        promptTemplate: { // PromptTemplate
          textPromptTemplate: "STRING_VALUE",
        },
      },
    },
  },
  sessionConfiguration: { // RetrieveAndGenerateSessionConfiguration
    kmsKeyArn: "STRING_VALUE", // required
  },
};
const command = new RetrieveAndGenerateCommand(input);
const response = await client.send(command);
// { // RetrieveAndGenerateResponse
//   sessionId: "STRING_VALUE", // required
//   output: { // RetrieveAndGenerateOutput
//     text: "STRING_VALUE", // required
//   },
//   citations: [ // Citations
//     { // Citation
//       generatedResponsePart: { // GeneratedResponsePart
//         textResponsePart: { // TextResponsePart
//           text: "STRING_VALUE",
//           span: { // Span
//             start: Number("int"),
//             end: Number("int"),
//           },
//         },
//       },
//       retrievedReferences: [ // RetrievedReferences
//         { // RetrievedReference
//           content: { // RetrievalResultContent
//             text: "STRING_VALUE", // required
//           },
//           location: { // RetrievalResultLocation
//             type: "S3", // required
//             s3Location: { // RetrievalResultS3Location
//               uri: "STRING_VALUE",
//             },
//           },
//           metadata: { // RetrievalResultMetadata
//             "<keys>": "DOCUMENT_VALUE",
//           },
//         },
//       ],
//     },
//   ],
// };


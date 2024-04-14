import { Router } from "express";

const router = Router();

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import {
  GetDocumentTextDetectionCommand,
  StartDocumentTextDetectionCommand,
  TextractClient,
} from "@aws-sdk/client-textract";
import { UUID } from "crypto";
import fs from "fs";

const credentials = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

const createUUID = () => {
  const u = crypto.randomUUID();
  return u;
};

const downloadFile = async (bucket: string, path: string) => {
  const s3Client = new S3Client({
    endpoint: "https://s3.dualstack.us-east-1.amazonaws.com",
    forcePathStyle: false,
    region: "us-east-1",
    credentials,
  });

  const params = {
    Bucket: bucket,
    Key: path,
  };

  return new Promise((resolve, reject) => {
    s3Client
      .send(new GetObjectCommand(params))
      .then((data) => {
        resolve(data);
        return;
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
      .finally(() => s3Client.destroy());
  });
};

const getObject = async (bucket: string, id: UUID) => {
  const s3Client = new S3Client({
    endpoint: "https://s3.dualstack.us-east-1.amazonaws.com",
    forcePathStyle: false,
    region: "us-east-1",
    credentials,
  });

  const params = {
    Bucket: bucket,
    Key: bucket === "civic-search-pdf" ? id + ".pdf" : id + ".txt",
  };

  return new Promise((resolve, reject) => {
    s3Client
      .send(new GetObjectCommand(params))
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
      .finally(() => s3Client.destroy());
  });
};

const putObject = async (bucket: string, file: Buffer, id: UUID) => {
  const s3Client = new S3Client({
    endpoint: "https://s3.dualstack.us-east-1.amazonaws.com",
    forcePathStyle: false,
    region: "us-east-1",
    credentials,
  });

  const params = {
    Bucket: bucket,
    Key: bucket === "civic-search-pdf" ? id + ".pdf" : id + ".txt",
    Body: file,
  };

  return new Promise((resolve, reject) => {
    s3Client
      .send(new PutObjectCommand(params))
      .then((data) => {
        console.log(data);
        resolve(data);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      })
      .finally(() => s3Client.destroy());
  });
};

const getPlain = async (id: UUID) => {
  const textractClient = new TextractClient({
    region: "us-east-1",
    credentials,
  });

  const params = {
    DocumentLocation: {
      S3Object: {
        Bucket: "civic-search-pdf",
        Name: id + ".pdf",
      },
    },
  };

  let jobId = "";

  try {
    const startJobResponse = await textractClient.send(
      new StartDocumentTextDetectionCommand(params)
    );
    jobId = startJobResponse.JobId || "";
  } catch (error) {
    console.error(error);
    textractClient.destroy();
    return;
  }

  let attempts = 0;

  const checkJobStatus = async () => {
    attempts += 1;
    try {
      const response = await textractClient.send(
        new GetDocumentTextDetectionCommand({ JobId: jobId })
      );
      console.log(response.JobStatus + " " + attempts);
      let out: { pages: number; text: string };
      if (response.JobStatus === "SUCCEEDED") {
        out = { pages: response.Blocks?.length || 0, text: "" };
        response.Blocks?.forEach((block) => {
          if (block.BlockType === "LINE") {
            out.text += block.Text + "\n";
          } else {
            out.text += block.Text + " ";
          }
        });

        await putObject("civic-search-plain", Buffer.from(out.text), id);
        textractClient.destroy();
        return;
      } else {
        setTimeout(checkJobStatus, 1000);
      }
    } catch (error) {
      console.error(error);
      textractClient.destroy();
      return;
    }
  };

  await checkJobStatus();
};

const run = async () => {
  const id = createUUID();
  const fileName =
    "Administrative Order No. 01 (2023 Series) Temporary suspension of enforcement of Chaper 8.11 (All-Electric New Buildings)-2.pdf"; // for db stuff
  const file = fs.readFileSync(
    "./src/assets/Administrative Order No. 01 (2023 Series) Temporary suspension of enforcement of Chaper 8.11 (All-Electric New Buildings)-2.pdf"
  );

  await putObject("civic-search-pdf", file, id);
  await getPlain(id);
};

router.post("/document", (req, res) => {
  // Handle file upload logic here
  // multer
});

export default router;

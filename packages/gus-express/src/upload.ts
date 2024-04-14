import { Router } from "express";

const router = Router();

import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import multer from "multer";

const upload = multer();

const credentials = {
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

const getObject = async (bucket: string, key: string) => {
  const s3Client = new S3Client({
    endpoint: "https://s3.dualstack.us-east-1.amazonaws.com",
    forcePathStyle: false,
    region: "us-east-1",
    credentials,
  });

  const params = {
    Bucket: bucket,
    Key: key,
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

const putObject = async (bucket: string, file: Buffer, key: string) => {
  const s3Client = new S3Client({
    endpoint: "https://s3.dualstack.us-east-1.amazonaws.com",
    forcePathStyle: false,
    region: "us-east-1",
    credentials,
  });

  const params = {
    Bucket: bucket,
    Key: key + ".pdf",
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

router.post("/document", upload.single("file"), (req, res) => {
  console.log("Uploading Document files...");
  const file = req.file;
  if (!file) {
    res.status(400).send("No file uploaded");
    return;
  }

  putObject("civic-search-pdf", file.buffer, file.originalname)
    .then(() => {
      console.log("File uploaded successfully");
      res.status(200).send("File uploaded successfully");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Internal server error");
    });
});

export default router;

import "dotenv/config";
import express from "express";

import searchRouter from "./search";
import uploadRouter from "./upload";

const PORT = 8080;

const app = express();

app.use(express.json());

app.use("/api/v1/upload/", uploadRouter);
app.use("/api/v1/search/", searchRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

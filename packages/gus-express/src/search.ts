import { Router } from "express";

const router = Router();

router.post("/request", async (req, res) => {
  console.log("Searching for documents...");
  console.log(req.body);
});

export default router;

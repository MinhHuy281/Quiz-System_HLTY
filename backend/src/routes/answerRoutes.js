import express from "express";

import {
  getAnswers,
  createAnswer,
  updateAnswer,
  deleteAnswer,
} from "../controllers/answerController.js";

const router = express.Router();

router.get("/", getAnswers);

router.post("/", createAnswer);

router.put("/:id", updateAnswer);

router.delete("/:id", deleteAnswer);

export default router;
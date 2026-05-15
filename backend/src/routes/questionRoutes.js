import express from "express";

import {
  getQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.get("/", getQuestions);

router.post("/", createQuestion);

router.put("/:id", updateQuestion);

router.delete("/:id", deleteQuestion);

export default router;
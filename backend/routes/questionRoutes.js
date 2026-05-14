import express from "express";

import {
  getQuestions,
  createQuestion,
  deleteQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.get("/", getQuestions);

router.post("/", createQuestion);

router.delete("/:id", deleteQuestion);

export default router;
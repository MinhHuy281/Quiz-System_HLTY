import Question from "../models/Question.js";
import Answer from "../models/Answer.js";

export const getQuestions = async (req, res) => {
  try {

    const questions = await Question.findAll({
      include: [
        {
          model: Answer,
        },
      ],
    });

    res.json(questions);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};

export const createQuestion = async (req, res) => {
  try {
    const { question_text } = req.body;

    if (!question_text) {
      return res.status(400).json({
        message: "Question text is required",
      });
    }

    const question = await Question.create({
      question_text,
    });

    res.status(201).json(question);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { question_text } = req.body;

    const question = await Question.findByPk(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    question.question_text = question_text;

    await question.save();

    res.json({
      message: "Question updated successfully",
      data: question,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);

    if (!question) {
      return res.status(404).json({
        message: "Question not found",
      });
    }

    await question.destroy();

    res.json({
      message: "Question deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
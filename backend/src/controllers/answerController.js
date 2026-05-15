import Answer from "../models/Answer.js";

export const getAnswers = async (req, res) => {
  try {
    const answers = await Answer.findAll();

    res.json(answers);

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const createAnswer = async (req, res) => {
  try {

    const {
      answer_text,
      is_correct,
      question_id,
    } = req.body;

    if (!answer_text) {
      return res.status(400).json({
        message: "Answer text is required",
      });
    }

    const answer = await Answer.create({
      answer_text,
      is_correct,
      question_id,
    });

    res.status(201).json(answer);

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};

export const updateAnswer = async (req, res) => {
  try {
    const { answer_text, is_correct } = req.body;

    const answer = await Answer.findByPk(req.params.id);

    if (!answer) {
      return res.status(404).json({
        message: "Answer not found",
      });
    }

    answer.answer_text = answer_text;
    answer.is_correct = is_correct;

    await answer.save();

    res.json({
      message: "Answer updated successfully",
      data: answer,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteAnswer = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);

    if (!answer) {
      return res.status(404).json({
        message: "Answer not found",
      });
    }

    await answer.destroy();

    res.json({
      message: "Answer deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
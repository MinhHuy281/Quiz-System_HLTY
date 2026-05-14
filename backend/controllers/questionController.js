import Question from "../src/models/Question.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.findAll();

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

export const deleteQuestion = async (req, res) => {
  try {
    await Question.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.json({
      message: "Question deleted",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
import Result from "../models/Result.js";

export const getResults = async (req, res) => {
  try {
    const results = await Result.findAll({
      order: [["createdAt", "DESC"]],
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const createResult = async (req, res) => {
  try {
    const { username, score, total_questions } = req.body;

    const result = await Result.create({
      username,
      score,
      total_questions,
    });

    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
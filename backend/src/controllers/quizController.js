import Answer from "../models/Answer.js";
import Result from "../models/Result.js";

export const submitQuiz = async (req, res) => {
  try {

    const { username, answers } = req.body;

    /*
      answers:
      [
        {
          question_id: 1,
          answer_id: 2
        }
      ]
    */

    let score = 0;

    for (const item of answers) {

      const answer = await Answer.findOne({
        where: {
          id: item.answer_id,
          question_id: item.question_id,
        },
      });

      if (answer && answer.is_correct) {
        score++;
      }
    }

    const result = await Result.create({
      username,
      score,
      total_questions: answers.length,
    });

    res.json({
      message: "Quiz submitted successfully",
      score,
      total_questions: answers.length,
      result,
    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }
};
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import Question from "./Question.js";

const Answer = sequelize.define("Answer", {
  answer_text: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  is_correct: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Question.hasMany(Answer, {
  foreignKey: "question_id",
});

Answer.belongsTo(Question, {
  foreignKey: "question_id",
});

export default Answer;
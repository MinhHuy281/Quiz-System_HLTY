import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Question = sequelize.define("Question", {
  question_text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default Question;
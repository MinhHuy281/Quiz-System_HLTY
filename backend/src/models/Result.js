import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Result = sequelize.define("Result", {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  total_questions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Result;
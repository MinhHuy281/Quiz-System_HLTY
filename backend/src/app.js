import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";

import Question from "./models/Question.js";
import Answer from "./models/Answer.js";
import Result from "./models/Result.js";

import questionRoutes from "./routes/questionRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import answerRoutes from "./routes/answerRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   DATABASE RELATION
========================= */

Question.hasMany(Answer, {
  foreignKey: "question_id",
});

Answer.belongsTo(Question, {
  foreignKey: "question_id",
});

/* =========================
   ROUTES
========================= */

app.use("/api/questions", questionRoutes);

app.use("/api/results", resultRoutes);

app.use("/api/answers", answerRoutes);

app.use("/api/quiz", quizRoutes);

/* =========================
   HEALTH CHECK
========================= */

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
  });
});

/* =========================
   DATABASE SYNC
========================= */

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
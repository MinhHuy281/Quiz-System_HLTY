import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";

import "./models/Question.js";
import "./models/Answer.js";
import "./models/Result.js";

import questionRoutes from "../routes/questionRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/questions", questionRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Server is running",
  });
});

sequelize.sync()
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.log(err);
  });

export default app;
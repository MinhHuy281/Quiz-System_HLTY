import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import sequelize from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  let connected = false;

  while (!connected) {
    try {
      await sequelize.authenticate();

      console.log("MySQL Connected");

      connected = true;

      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });

    } catch (error) {
      console.log("Database connection failed. Retrying in 5s...");

      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
};

startServer();
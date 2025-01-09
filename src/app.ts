import express from "express";
import cors from "cors";
import { config } from "dotenv";

import { authRouter } from "./routes";
import { connectToDatabase } from "./database";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", authRouter);

const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();

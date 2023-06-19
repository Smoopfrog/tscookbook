import "dotenv/config";
import env from './util/validateEnv'
import mongoose from "mongoose";
import express from "express";
const app = express();
const port = env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World");
});

mongoose
  .connect(env.MONGO_DB_CONNECTION)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(console.error);

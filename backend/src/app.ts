import "dotenv/config";
import express from "express";
import RecipeModel from "./models/recipe";

const app = express();

app.get("/", async (req, res) => {
  try {
    const recipes = await RecipeModel.find().exec();
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    let errorMessage = "An unknown error occured.";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
});

export default app;

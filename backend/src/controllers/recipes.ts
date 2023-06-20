import { RequestHandler } from "express";
import RecipeModel from "../models/recipe";

export const getRecipes: RequestHandler = async (req, res, next) => {
  try {
    const recipes = await RecipeModel.find().exec();
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

export const createRecipe: RequestHandler = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;

  try {
    const newRecipe = await RecipeModel.create({
      title: title,
      description: description,
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

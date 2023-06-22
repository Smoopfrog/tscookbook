import { RequestHandler } from "express";
import RecipeModel from "../models/recipe";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export const getRecipes: RequestHandler = async (req, res, next) => {
  try {
    const recipes = await RecipeModel.find().exec();
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

export const getRecipe: RequestHandler = async (req, res, next) => {
  const recipeId = req.params.recipeId;

  try {
    if (!mongoose.isValidObjectId(recipeId)) {
      throw createHttpError(400, "Invalid recipe id");
    }

    const recipe = await RecipeModel.findById(recipeId).exec();

    if (!recipe) {
      throw createHttpError(404, "Recipe not found");
    }

    res.status(200).json(recipe);
  } catch (error) {
    next(error);
  }
};

interface CreateRecipeBody {
  title?: string;
  description?: string;
}

export const createRecipe: RequestHandler<
  unknown,
  unknown,
  CreateRecipeBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;

  try {
    if (!title) {
      throw createHttpError(400, "Recipe must have a title");
    }

    if (!description) {
      throw createHttpError(400, "Recipe must have a description");
    }

    const newRecipe = await RecipeModel.create({
      title: title,
      description: description,
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

interface UpdateRecipeParams {
  recipeId: string;
}

interface UpdateRecipeBody {
  title?: string;
  description?: string;
}

export const updateRecipe: RequestHandler<
  UpdateRecipeParams,
  unknown,
  UpdateRecipeBody,
  unknown
> = async (req, res, next) => {
  const recipeId = req.params.recipeId;
  const newTitle = req.body.title;
  const newDescription = req.body.description;

  try {
    if (!mongoose.isValidObjectId(recipeId)) {
      throw createHttpError(400, "Invalid recipe id");
    }

    if (!newTitle) {
      throw createHttpError(400, "Recipe must have a title");
    }

    if (!newDescription) {
      throw createHttpError(400, "Recipe must have a description");
    }

    const recipe = await RecipeModel.findById(recipeId).exec();

    if (!recipe) {
      throw createHttpError(404, "Recipe not found");
    }

    recipe.title = newTitle;
    recipe.description = newDescription;

    const updatedRecipe = await recipe.save();

    res.status(200).json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe: RequestHandler = async (req, res, next) => {
  const recipeId = req.params.recipeId;

  try {
    if (!mongoose.isValidObjectId(recipeId)) {
      throw createHttpError(400, "Invalid recipe id");
    }

    const recipe = await RecipeModel.findById(recipeId).exec();

    if (!recipe) {
      throw createHttpError(404, "Recipe not found");
    }

    await recipe.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

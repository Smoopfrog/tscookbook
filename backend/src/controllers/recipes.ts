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
  category?: string;
  portion?: string;
  cooktime?: string;
  ingredients?: { amount: number; measurement?: string; name: string }[];
  directions?: { text: string }[];
}

export const createRecipe: RequestHandler<
  unknown,
  unknown,
  CreateRecipeBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const portion = req.body.portion;
  const cooktime = req.body.cooktime;
  const ingredients = req.body.ingredients;
  const directions = req.body.directions;
  try {
    if (!title) {
      throw createHttpError(400, "Recipe must have a title");
    }

    const newRecipe = await RecipeModel.create({
      title: title,
      description: description,
      category: category,
      portion: portion,
      cooktime: cooktime,
      ingredients: ingredients,
      directions: directions,
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
  _id: string;
  title: string;
  description?: string;
  portion?: string;
  cooktime?: string;
  category?: string;
  ingredients?: { amount?: string; measurement?: string; name?: string }[];
  directions?: { text: string }[];
  createdAt: string;
  updatedAt: string;
  __v: string;
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
  const newPortion = req.body.portion;
  const newCooktime = req.body.cooktime;
  const newIngredients = req.body.ingredients!;
  const newDirections = req.body.directions!;

  try {
    if (!mongoose.isValidObjectId(recipeId)) {
      throw createHttpError(400, "Invalid recipe id");
    }

    const recipe = await RecipeModel.findById(recipeId).exec();

    if (!recipe) {
      throw createHttpError(404, "Recipe not found");
    }

    recipe.title = newTitle;
    recipe.description = newDescription;
    recipe.portion = newPortion;
    recipe.cooktime = newCooktime;
    recipe.ingredients = newIngredients;
    recipe.directions = newDirections;

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

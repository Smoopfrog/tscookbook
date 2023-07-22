import { RequestHandler } from "express";
import RecipeModel from "../models/recipe";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";

export const getRecipes: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);
    const recipes = await RecipeModel.find({
      userId: authenticatedUserId,
    }).exec();
    console.log(recipes)
    res.status(200).json(recipes);
  } catch (error) {
    next(error);
  }
};

export const getRecipe: RequestHandler = async (req, res, next) => {
  const recipeId = req.params.recipeId;
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(recipeId)) {
      throw createHttpError(400, "Invalid recipe id");
    }

    const recipe = await RecipeModel.findById(recipeId).exec();

    if (!recipe) {
      throw createHttpError(404, "Recipe not found");
    }

    if (!recipe.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "Not authorized to access this recipe.");
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
  imgURL?: string;
  ingredients?: { amount?: string; name: string }[];
  directions?: { text: string }[];
}

export const createRecipe: RequestHandler<
  unknown,
  unknown,
  CreateRecipeBody,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const title = req.body.title;
  const description = req.body.description;
  const category = req.body.category;
  const portion = req.body.portion;
  const cooktime = req.body.cooktime;
  const imgURL = req.body.imgURL;
  const ingredients = req.body.ingredients;
  const directions = req.body.directions;

  try {
    assertIsDefined(authenticatedUserId);

    if (!title) {
      throw createHttpError(400, "Recipe must have a title");
    }

    const newRecipe = await RecipeModel.create({
      userId: authenticatedUserId,
      title: title,
      description: description,
      category: category,
      portion: portion,
      cooktime: cooktime,
      imgURL,
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
  imgURL?: string;
  ingredients?: { amount?: string; name?: string }[];
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
  const authenticatedUserId = req.session.userId;
  const recipeId = req.params.recipeId;
  const newTitle = req.body.title;
  const newDescription = req.body.description;
  const newPortion = req.body.portion;
  const newCooktime = req.body.cooktime;
  const newImgURL = req.body.imgURL;
  const newIngredients = req.body.ingredients!;
  const newDirections = req.body.directions!;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(recipeId)) {
      throw createHttpError(400, "Invalid recipe id");
    }

    const recipe = await RecipeModel.findById(recipeId).exec();

    if (!recipe) {
      throw createHttpError(404, "Recipe not found");
    }

    if (!recipe.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "Not authorized to access this recipe.");
    }

    recipe.title = newTitle;
    recipe.description = newDescription;
    recipe.portion = newPortion;
    recipe.cooktime = newCooktime;
    recipe.imgURL = newImgURL;
    recipe.ingredients = newIngredients;
    recipe.directions = newDirections;

    const updatedRecipe = await recipe.save();
    res.status(200).json(updatedRecipe);
  } catch (error) {
    next(error);
  }
};

export const deleteRecipe: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const recipeId = req.params.recipeId;

  try {
    assertIsDefined(authenticatedUserId);

    if (!mongoose.isValidObjectId(recipeId)) {
      throw createHttpError(400, "Invalid recipe id");
    }

    const recipe = await RecipeModel.findById(recipeId).exec();

    if (!recipe) {
      throw createHttpError(404, "Recipe not found");
    }

    if (!recipe.userId.equals(authenticatedUserId)) {
      throw createHttpError(401, "Not authorized to access this recipe.");
    }

    await recipe.deleteOne();

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

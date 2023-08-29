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

export const getRandomRecipe: RequestHandler = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;

  try {
    assertIsDefined(authenticatedUserId);

    const count = await RecipeModel.find({
      userId: authenticatedUserId,
    }).count();

    const random = Math.floor(Math.random() * count);

    const recipe = await RecipeModel.findOne({ userId: authenticatedUserId })
      .skip(random)
      .exec();

    if (!recipe) {
      throw createHttpError(404, "Recipe not found");
    }

    res.status(200).json(recipe._id);
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
  tags?: string[];
  ingredients?: { amount?: string; name: string }[];
  directions?: { text: string }[];
}

interface CreateRecipeBodyBody {
  recipe: CreateRecipeBody;
}
export const createRecipe: RequestHandler<
  unknown,
  unknown,
  CreateRecipeBodyBody,
  unknown
> = async (req, res, next) => {
  const recipe = JSON.parse(req.body.recipe as string);
  const authenticatedUserId = req.session.userId;
  const title = recipe.title;
  const description = recipe.description;
  const category = recipe.category;
  const portion = recipe.portion;
  const cooktime = recipe.cooktime;
  const imgURL = recipe.imgURL;
  const tags = recipe.tags;
  const ingredients = recipe.ingredients;
  const directions = recipe.directions;
  console.log("req.file", req.file);
  console.log("req.body", recipe);

  try {
    assertIsDefined(authenticatedUserId);

    if (!title) {
      throw createHttpError(400, "Recipe must have a title");
    }

    const newRecipe = await RecipeModel.create({
      userId: authenticatedUserId,
      title,
      description,
      category,
      portion,
      cooktime,
      imgURL,
      tags,
      ingredients,
      directions,
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
  tags?: string[];
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
  const newTags = req.body.tags!;
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
    recipe.tags = newTags;
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

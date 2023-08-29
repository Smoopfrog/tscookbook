import { RequestHandler } from "express";
import RecipeModel from "../models/recipe";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/assertIsDefined";
import env from "../util/validateEnv";
import cloudinary from "cloudinary";
import fs from "fs";

cloudinary.v2.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

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

interface CreateRecipeFormBody {
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

interface CreateRecipeBody {
  recipe: CreateRecipeFormBody;
}

export const createRecipe: RequestHandler<
  unknown,
  unknown,
  CreateRecipeBody,
  unknown
> = async (req, res, next) => {
  const recipe = JSON.parse(req.body.recipe as string);
  const authenticatedUserId = req.session.userId;
  const title = recipe.title;
  const description = recipe.description;
  const category = recipe.category;
  const portion = recipe.portion;
  const cooktime = recipe.cooktime;
  let imgURL = recipe.imgURL;
  const tags = recipe.tags;
  const ingredients = recipe.ingredients;
  const directions = recipe.directions;
  const image = req.file;

  try {
    assertIsDefined(authenticatedUserId);

    if (!title) {
      throw createHttpError(400, "Recipe must have a title");
    }

    if (image) {
      const tempFilePath = `/tmp/${Date.now()}-${image.originalname}`;
      fs.writeFileSync(tempFilePath, image.buffer);

      const result = await cloudinary.v2.uploader.upload(tempFilePath, {
        resource_type: "auto",
      });
      imgURL = result.secure_url;
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

interface UpdateRecipeFormBody {
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

interface UpdateRecipeBody {
  recipe: UpdateRecipeFormBody;
}

export const updateRecipe: RequestHandler<
  UpdateRecipeParams,
  unknown,
  any,
  unknown
> = async (req, res, next) => {
  const authenticatedUserId = req.session.userId;
  const recipeId = req.params.recipeId;
  const recipe = JSON.parse(req.body.recipe);
  const newTitle = recipe.title;
  const newDescription = recipe.description;
  const newPortion = recipe.portion;
  const newCooktime = recipe.cooktime;
  let newImgURL = recipe.imgURL;
  const newTags = recipe.tags!;
  const newIngredients = recipe.ingredients!;
  const newDirections = recipe.directions!;
  const image = req.file;

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

    if (image) {
      const tempFilePath = `/tmp/${Date.now()}-${image.originalname}`;
      fs.writeFileSync(tempFilePath, image.buffer);

      const result = await cloudinary.v2.uploader.upload(tempFilePath, {
        resource_type: "auto",
      });

      newImgURL = result.secure_url;
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

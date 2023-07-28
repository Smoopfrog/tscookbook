import express from "express";
import * as RecipesController from "../controllers/recipes";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, RecipesController.getRecipes);

router.get("/:recipeId", requiresAuth, RecipesController.getRecipe);

router.post("/", RecipesController.createRecipe);

router.patch("/:recipeId", RecipesController.updateRecipe);

router.delete("/:recipeId", requiresAuth, RecipesController.deleteRecipe);

export default router;

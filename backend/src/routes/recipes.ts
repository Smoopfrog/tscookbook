import express from "express";
import * as RecipesController from "../controllers/recipes";
import { requiresAuth } from "../middleware/auth";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.get("/", requiresAuth, RecipesController.getRecipes);

router.get("/random", requiresAuth, RecipesController.getRandomRecipe);

router.get("/:recipeId", requiresAuth, RecipesController.getRecipe);

router.post("/", upload.single("files"), RecipesController.createRecipe);

router.patch("/:recipeId", RecipesController.updateRecipe);

router.delete("/:recipeId", requiresAuth, RecipesController.deleteRecipe);

export default router;

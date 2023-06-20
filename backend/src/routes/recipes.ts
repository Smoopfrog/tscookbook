import express from "express";
import * as RecipesController from "../controllers/recipes";

const router = express.Router();

router.get("/", RecipesController.getRecipes);

export default router;

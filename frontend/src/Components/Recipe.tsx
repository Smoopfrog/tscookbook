import { ReactNode } from "react";
import { Recipe as RecipeModel } from "../models/recipe";
import * as RecipesApi from "../network/recipes_api";

interface RecipeProps {
  recipe: RecipeModel;
}

const Recipe = ({ recipe }: RecipeProps) => {
  const ingredientComponents: ReactNode = recipe.ingredients?.map(
    (ingredient, index) => {
      return (
        <li key={index}>
          {ingredient.amount} {ingredient.measurement} {ingredient.name}
        </li>
      );
    }
  );

  const directionComponents: ReactNode = recipe.directions?.map(
    (direction, index) => {
      return <li key={index}>{direction.text}</li>;
    }
  );

  return (
    <article>
      <h1>{recipe.title}</h1>
      <h6>Category: {recipe.category}</h6>
      <h6>Yield: {recipe.portion}</h6>
      <h6>Cooktime: {recipe.cooktime}</h6>
      <p>{recipe.description}</p>
      {ingredientComponents && <ul>{ingredientComponents}</ul>}
      {directionComponents && <ol>{directionComponents}</ol>}
      <button onClick={() => RecipesApi.deleteRecipe(recipe._id)}>
        Delete
      </button>
    </article>
  );
};

export default Recipe;

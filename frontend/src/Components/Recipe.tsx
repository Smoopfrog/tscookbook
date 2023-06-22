import { ReactNode } from "react";
import { Recipe as RecipeModel } from "../models/recipe";

interface RecipeProps {
  recipe: RecipeModel;
}

const Recipe = ({ recipe }: RecipeProps) => {
  const ingredientComponents: ReactNode = recipe.ingredients?.map(
    (ingredient) => {
      return (
        <li>
          {ingredient.amount} {ingredient.measurement} {ingredient.name}
        </li>
      );
    }
  );

  const directionComponents: ReactNode = recipe.directions?.map((direction) => {
    return <li>{direction}</li>;
  });

  return (
    <article>
      <h1>{recipe.title}</h1>
      <h6>Category: {recipe.category}</h6>
      <h6>Yield: {recipe.portion}</h6>
      <h6>Cooktime: {recipe.cooktime}</h6>
      <p>{recipe.description}</p>
      {ingredientComponents && <ul>{ingredientComponents}</ul>}
      {directionComponents && <ol>{directionComponents}</ol>}
    </article>
  );
};

export default Recipe;

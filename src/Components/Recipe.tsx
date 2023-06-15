import { ReactNode } from "react";
import { RecipeInfo } from "../App";

const Recipe = (props: { recipe: RecipeInfo }) => {
  const ingredientComponents: ReactNode = props.recipe.ingredients.map(
    (ingredient) => {
      return (
        <li>
          <span>{ingredient.amount}</span>
          <span>{ingredient.measurement}</span>
          <span>{ingredient.name}</span>
        </li>
      );
    }
  );
  return (
    <article>
      <h1>{props.recipe.title}</h1>
      <h2>{props.recipe.category}</h2>
      <p>{props.recipe.description}</p>
      <ul>{ingredientComponents}</ul>
    </article>
  );
};

export default Recipe;

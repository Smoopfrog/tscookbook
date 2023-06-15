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

  const directionComponents: ReactNode = props.recipe.directions.map(
    (direction) => {
      return <li>{direction}</li>;
    }
  );
  
  return (
    <article>
      <h1>{props.recipe.title}</h1>
      <h2>{props.recipe.category}</h2>
      <p>{props.recipe.description}</p>
      <ul>{ingredientComponents}</ul>
      <ol>{directionComponents}</ol>
    </article>
  );
};

export default Recipe;

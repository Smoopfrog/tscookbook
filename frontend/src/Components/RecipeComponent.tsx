import { ReactNode } from "react";
import { Recipe } from "../models/recipe";

const RecipeComponent = (props: { recipe: Recipe }) => {
  // const ingredientComponents: ReactNode = props.recipe.ingredients.map(
  //   (ingredient) => {
  //     return (
  //       <li>
  //         <span>{ingredient.amount}</span>
  //         <span>{ingredient.measurement}</span>
  //         <span>{ingredient.name}</span>
  //       </li>
  //     );
  //   }
  // );

  // const directionComponents: ReactNode = props.recipe.directions.map(
  //   (direction) => {
  //     return <li>{direction}</li>;
  //   }
  // );
  
  return (
    <article>
      <h1>{props.recipe.title}</h1>
      {/* <h2>{props.recipe.category}</h2> */}
      <p>{props.recipe.description}</p>
      {/* <ul>{ingredientComponents}</ul>
      <ol>{directionComponents}</ol> */}
    </article>
  );
};

export default RecipeComponent;

import { ReactNode, MouseEvent } from "react";
import { Recipe as RecipeModel } from "../models/recipe";
import * as RecipesApi from "../network/recipes_api";
import { useLoaderData, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Recipe = () => {
  const recipe = useLoaderData() as RecipeModel;
  const navigate = useNavigate();

  const deleteRecipe = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      await RecipesApi.deleteRecipe(recipe._id);
      navigate("/myrecipes");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

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
      <img src={recipe.imgURL} alt="A meaning full alt tag" />
      <h1>{recipe.title}</h1>
      <h6>Yield: {recipe.portion}</h6>
      <h6>Cooktime: {recipe.cooktime}</h6>
      <p>{recipe.description}</p>
      {ingredientComponents && <ul>{ingredientComponents}</ul>}
      {directionComponents && <ol>{directionComponents}</ol>}
      <button onClick={deleteRecipe}>Delete</button>
      <Link to={`/myrecipes/${recipe._id}/edit`}>Edit</Link>
    </article>
  );
};

export default Recipe;

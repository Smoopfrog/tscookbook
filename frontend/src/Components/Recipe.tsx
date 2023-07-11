import { ReactNode, MouseEvent } from "react";
import { Recipe as RecipeModel } from "../models/recipe";
import * as RecipesApi from "../network/recipes_api";
import { useLoaderData, useNavigate, Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa6";
import { PiForkKnife } from "react-icons/pi";
import { BiEdit } from "react-icons/bi";
import "../Styles/Recipe.css";

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
        <li className="recipe-ingredient" key={index}>
          <span>{ingredient.amount} </span>
          {ingredient.measurement} {ingredient.name}
        </li>
      );
    }
  );

  const directionComponents: ReactNode = recipe.directions?.map(
    (direction, index) => {
      return (
        <li key={index}>
          <span className="recipe-direction-index">{index + 1}.</span>
          <span className="recipe-direction-text">{direction.text}</span>
        </li>
      );
    }
  );

  return (
    <article className="recipe">
      <img src={recipe.imgURL} alt="A meaning full alt tag" />
      <div className="recipe-info">
        <h1>{recipe.title}</h1>
        <div className="recipe-info-subtitles">
          <div className="recipe-info-spec">
            <FaRegClock />
            <span>Time: {recipe.cooktime}</span>
          </div>
          <div className="recipe-info-spec">
            <PiForkKnife />
            <span>Yield: {recipe.portion}</span>
          </div>
        </div>
        <p className="recipe-description">{recipe.description}</p>
        <Link className="recipe-edit-icon" to={`/myrecipes/${recipe._id}/edit`}>
          <BiEdit />
        </Link>
      </div>
      {ingredientComponents && (
        <div className="recipe-ingredients">
          <h2>Ingredients</h2>
          <ul className="recipe-ingredients-list">{ingredientComponents}</ul>
        </div>
      )}
      {directionComponents && (
        <div className="recipe-directions">
          <h2>Directions</h2>
          <ol>{directionComponents}</ol>
        </div>
      )}
    </article>
  );
};

export default Recipe;

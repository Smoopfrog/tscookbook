import { ReactNode, useState } from "react";
import { Recipe as RecipeModel } from "../models/recipe";
import { useLoaderData, Link, useNavigate } from "react-router-dom";
import { FaRegClock } from "react-icons/fa6";
import { PiForkKnife } from "react-icons/pi";
import { BiEdit, BiTrash } from "react-icons/bi";
import * as RecipesApi from "../network/recipes_api";
import { MouseEvent } from "react";
import "../Styles/Recipe.css";

const Recipe = () => {
  const [carouselPage, setCarouselPage] = useState("About");

  const handleClickScroll = (page: string) => {
    const element = document.getElementById(page);

    if (element) {
      setCarouselPage(page);

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  const recipe = useLoaderData() as RecipeModel;
  const navigate = useNavigate();

  const ingredientComponents: ReactNode = recipe.ingredients?.map(
    (ingredient, index) => {
      return (
        <li className="recipe-ingredient" key={index}>
          <span>{ingredient.amount} </span>
          {ingredient.name}
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

  const deleteRecipe = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      await RecipesApi.deleteRecipe(recipe._id);
      navigate("/myrecipes");
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };

  return (
    <article className="recipe">
      <div className="recipe-carousel">
        <section id="About">
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
            <Link
              className="recipe-edit-icon"
              to={`/myrecipes/${recipe._id}/edit`}
            >
              <BiEdit />
            </Link>
          </div>
          <div className="recipe-tags">
            {recipe.tags &&
              recipe.tags.map((tag, index) => {
                return (
                  <button key={index} className="recipe-tag">
                    {tag}
                  </button>
                );
              })}
          </div>
        </section>
        <section id="Ingredients" className="recipe-ingredients">
          <h2>Ingredients</h2>
          <ul className="recipe-ingredients-list">{ingredientComponents}</ul>
        </section>
        <section id="Directions" className="recipe-directions">
          <h2>Directions</h2>
          <ol>{directionComponents}</ol>
        </section>
      </div>
      <footer className="recipe-form-footer">
        <button onClick={() => handleClickScroll("About")} type="button">
          About
        </button>
        <button onClick={() => handleClickScroll("Ingredients")} type="button">
          Ingredients
        </button>
        <button onClick={() => handleClickScroll("Directions")} type="button">
          Directions
        </button>
      </footer>
    </article>
  );
};

export default Recipe;

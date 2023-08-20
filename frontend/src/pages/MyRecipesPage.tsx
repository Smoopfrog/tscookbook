import { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import RecipeThumbnail from "../Components/UI/RecipeThumbnail";
import { Recipe } from "../models/recipe";
import { User } from "../models/user";
import "../Styles/MyRecipesPage.css";

const MyRecipesPage = () => {
  const { user, recipes } = useLoaderData() as {
    user: User;
    recipes: Recipe[];
  };

  const [recipeFilter, setRecipeFilter] = useState("");

  return (
    <section className="my-recipes-page">
      <header className="my-recipes-page-header">
        <div>
          <h1 className="my-recipes-page-title">My Recipes</h1>
          <Link className="add-recipe" to="/newrecipe">
            Add Recipe
          </Link>
        </div>
        <div className="my-recipes-tags">
          <button
            className={`${recipeFilter === "" && "tag-selected"}`}
            onClick={() => setRecipeFilter("")}
          >
            All
          </button>
          {user.tags &&
            user.tags.map((tag: string, index: number) => {
              return (
                <button
                  key={index}
                  className={`${recipeFilter === tag && "tag-selected"}`}
                  onClick={() => setRecipeFilter(tag)}
                >
                  {tag}
                </button>
              );
            })}
        </div>
      </header>
      <ul>
        {recipeFilter
          ? recipes
              .filter((recipe) => recipe.tags!.includes(recipeFilter))
              .map((filteredRecipe) => {
                return (
                  <li key={filteredRecipe._id}>
                    <RecipeThumbnail recipe={filteredRecipe} />
                  </li>
                );
              })
          : recipes.map((recipe) => {
              return (
                <li key={recipe._id}>
                  <RecipeThumbnail recipe={recipe} />
                </li>
              );
            })}
      </ul>
    </section>
  );
};

export default MyRecipesPage;

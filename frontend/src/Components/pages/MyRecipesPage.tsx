import { useLoaderData, Link } from "react-router-dom";
import RecipeThumbnail from "../RecipeThumbnail";
import { Recipe } from "../../models/recipe";
import "../../Styles/MyRecipesPage.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";
import { useState } from "react";

const MyRecipesPage = () => {
  const recipes = useLoaderData() as Recipe[];
  const tags = useSelector(selectUser).tags;
  const [recipeFilter, setRecipeFilter] = useState("");

  return (
    <section className="my-recipes-page">
      <header className="my-recipes-page-header">
        <div>
          <h1 className="my-recipes-page-title">My Recipes</h1>
          <Link to="/newrecipe">Add Recipe</Link>
        </div>
        <div className="my-recipes-tags">
          <button
            className={`${recipeFilter === "" && "tag-selected"}`}
            onClick={() => setRecipeFilter("")}
          >
            All
          </button>
          {tags &&
            tags.map((tag) => {
              return (
                <button
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

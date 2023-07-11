import { useLoaderData, Link } from "react-router-dom";
import RecipeThumbnail from "../RecipeThumbnail";
import { Recipe } from "../../models/recipe";
import "../../Styles/MyRecipesPage.css";

const MyRecipesPage = () => {
  const recipes = useLoaderData() as Recipe[];

  return (
    <section className="my-recipes-page">
      <header className="my-recipes-page-header">
        <h1 className="my-recipes-page-title">My Recipes</h1>
        <Link to="/newrecipe">Add Recipe</Link>
      </header>
      <ul>
        {recipes.map((recipe) => {
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

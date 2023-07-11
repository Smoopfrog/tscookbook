import { useLoaderData } from "react-router-dom";
import RecipeThumbnail from "../RecipeThumbnail";
import { Recipe } from "../../models/recipe";
import "../../Styles/MyRecipesPage.css"

const MyRecipesPage = () => {
  const recipes = useLoaderData() as Recipe[];

  return (
    <section className="my-recipes-page">
      <h1>My Recipes</h1>
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

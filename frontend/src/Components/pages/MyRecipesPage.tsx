import { useLoaderData } from "react-router-dom";
import RecipeThumbnail from "../RecipeThumbnail";
import { Recipe } from "../../models/recipe";

const MyRecipesPage = () => {
  const recipes = useLoaderData() as Recipe[];

  console.log(recipes);

  return (
    <section>
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

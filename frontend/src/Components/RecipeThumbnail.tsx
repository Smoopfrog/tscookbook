import { Link } from "react-router-dom";
import { Recipe } from "../models/recipe";

interface ThumbnailProps {
  recipe: Recipe;
}

const RecipeThumbnail = ({ recipe }: ThumbnailProps) => {
  return (
    <Link to={`/myrecipes/${recipe._id}`}>
      <h1>{recipe.title}</h1>
      <div>
        <span>Clock</span>
        <span>{recipe.cooktime}</span>
      </div>
      <div>
        <span>fork</span>
        <span>{recipe.portion}</span>
      </div>
    </Link>
  );
};

export default RecipeThumbnail;

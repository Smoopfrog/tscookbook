import { Link } from "react-router-dom";
import { Recipe } from "../models/recipe";
import "../Styles/RecipeThumbnail.css";
import { FaRegClock } from "react-icons/fa6";
import { PiForkKnife, PiTagBold } from "react-icons/pi";

interface ThumbnailProps {
  recipe: Recipe;
}

const RecipeThumbnail = ({ recipe }: ThumbnailProps) => {
  return (
    <Link className="recipe-thumbnail" to={`/myrecipes/${recipe._id}`}>
      <img src={recipe.imgURL} alt="Something" />
      <div className="recipe-thumbnail-info">
        <h1>{recipe.title}</h1>
        <div className="recipe-thumbnail-info-div">
          <FaRegClock />
          <span>{recipe.cooktime}</span>
        </div>
        <div className="recipe-thumbnail-info-div">
          <PiForkKnife />
          <span>{recipe.portion}</span>
        </div>
        <div className="recipe-thumbnail-info-div">
          <PiTagBold />
          <span>
            {recipe.tags &&
              recipe.tags.join(", ")}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default RecipeThumbnail;

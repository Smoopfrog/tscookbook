import { Link } from "react-router-dom";

const RecipeThumbnail = () => {
  return (
    <Link to="/myrecipes/649a6b450430b2b457631482">
      <h1>Title</h1>
      <div>
        <span>Clock</span>
        <span>Cooktime</span>
      </div>
      <div>
        <span>fork</span>
        <span>Yield</span>
      </div>
    </Link>
  );
};

export default RecipeThumbnail;

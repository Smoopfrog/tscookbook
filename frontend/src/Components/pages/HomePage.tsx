import { Link } from "react-router-dom";
import "../../Styles/HomePage.css";

const HomePage = () => {
  return (
    <section className="homepage">
      <h1>TS Cookbook</h1>
      <ul className="nav-list">
        <Link className="nav-item" to="/myrecipes">
          My Recipes
        </Link>
        <Link className="nav-item" to="/newrecipe">
          New Recipe
        </Link>
        <Link className="nav-item" to="/signup">
          SignUp/Login
        </Link>
        <Link className="nav-item" to="/">
          Surprise Me!
        </Link>
      </ul>
    </section>
  );
};

export default HomePage;

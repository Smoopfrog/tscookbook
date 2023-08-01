import { Link } from "react-router-dom";
import "../../Styles/HomePage.css";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";

const HomePage = () => {
  const user = useAppSelector(selectUser);

  return (
    <section className="homepage">
      {user.username ? (
        <ul className="nav-list">
          <h1>TS Cookbook</h1>
          <Link className="nav-item" to="/myrecipes">
            My Recipes
          </Link>
          <Link className="nav-item" to="/newrecipe">
            New Recipe
          </Link>

          <Link className="nav-item" to="/">
            Surprise Me!
          </Link>
        </ul>
      ) : (
        <div className="homepage-default">
          <h1>The Greatest Cookbook App Ever Created</h1>
          <p>
            Save recipes to a digital recipe box, making it easy to create, and
            organize your cooking inspirations.
          </p>
          <Link className="nav-item" to="/signup">
            Get Started
          </Link>
        </div>
      )}
    </section>
  );
};

export default HomePage;

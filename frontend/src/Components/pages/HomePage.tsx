import { Link } from "react-router-dom";
import "../../Styles/HomePage.css";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";

const HomePage = () => {
  const user = useAppSelector(selectUser);

  return (
    <section className="homepage">
      <h1>TS Cookbook</h1>
      <ul className="nav-list">
        {user.username ? (
          <>
            <Link className="nav-item" to="/myrecipes">
              My Recipes
            </Link>
            <Link className="nav-item" to="/newrecipe">
              New Recipe
            </Link>

            <Link className="nav-item" to="/">
              Surprise Me!
            </Link>
          </>
        ) : (
          <>
            <Link className="nav-item" to="/login">
              Log in
            </Link>
            <Link className="nav-item" to="/signup">
              Sign Up
            </Link>
          </>
        )}
      </ul>
    </section>
  );
};

export default HomePage;

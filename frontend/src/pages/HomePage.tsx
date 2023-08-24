import { Link } from "react-router-dom";
import "../Styles/HomePage.css";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout, selectUser } from "../slices/userSlice";
import * as UsersApi from "../api/users_api";
import { BsFillStarFill } from "react-icons/bs";
import HomepageHeader from "../Components/Header/HomepageHeader";
import RecipePageImg from "../Assets/RecipePage.webp";
import MyRecipesPageImg from "../Assets/MyRecipesPage.webp";

const HomePage = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    UsersApi.logout();
    dispatch(logout());
  };

  return (
    <section className="homepage">
      {user.username ? (
        <ul className="nav-list">
          <h1>Flavourful Plates</h1>
          <Link className="nav-item" to="/myrecipes">
            My Recipes
          </Link>
          <Link className="nav-item" to="/newrecipe">
            New Recipe
          </Link>
          <Link className="nav-item" to="/">
            Surprise Me!
          </Link>
          <Link className="nav-item" to="/tags">
            Tags
          </Link>
          <Link className="nav-item" to="/account">
            Account
          </Link>
          <Link className="nav-item" to="/" onClick={handleLogout}>
            Sign Out
          </Link>
        </ul>
      ) : (
        <>
          <HomepageHeader />
          <div className="homepage-default">
            <div className="homepage-default-text">
              <h1>The Greatest Cookbook App Ever Created</h1>
              <p>
                Save recipes to a digital recipe box, making it easy to create,
                and organize your cooking inspirations.
              </p>
              <Link className="nav-item" to="/signup">
                Get Started
              </Link>
              <div className="homepage-star-review">
                <div className="homepage-stars">
                  <BsFillStarFill className="homepage-star" size={24} />
                  <BsFillStarFill className="homepage-star" size={24} />
                  <BsFillStarFill className="homepage-star" size={24} />
                  <BsFillStarFill className="homepage-star" size={24} />
                  <BsFillStarFill className="homepage-star" size={24} />
                </div>
                <p className="homepage-subtext">
                  5 star rating according to The App Experts
                </p>
              </div>
            </div>
            <div className="homepage-img-section">
              <img
                className="homepage-img-back"
                src={MyRecipesPageImg}
                alt="A demo of the My Recipes Page in mobile view"
              />
              <img
                className="homepage-img"
                src={RecipePageImg}
                alt="A demo of the a Recipe Page in mobile view"
              />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default HomePage;

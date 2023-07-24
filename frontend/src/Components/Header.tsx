import { useState } from "react";
import "../Styles/Header.css";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import {
  FaHome,
  FaPlus,
  FaBook,
  FaSearch,
  FaDice,
  FaRegUser,
  FaSignOutAlt,
} from "react-icons/fa";
import * as UsersApi from "../network/users_api";
import { useAppDispatch, useAppSelector } from "../hooks";
import { logout, selectUser } from "../slices/userSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const path = useLocation().pathname;
  let isEditPath = false;
  const handleLogout = () => {
    UsersApi.logout();
    handleMenuAside();
    dispatch(logout());
  };

  if (path.substring(path.length - 4) === "edit") {
    isEditPath = true;
  }

  const [showMenuAside, setShowMenuAside] = useState<Boolean>(false);

  const handleMenuAside = (): void => {
    setShowMenuAside((prev) => !prev);
  };

  return (
    <header
      className={`header ${(path === "/newrecipe" || isEditPath) && "hide"}`}
    >
      <div className="header-nav">
        <div> </div>
        <h1>TS Cookbook</h1>
        <button className="header-menu-btn" onClick={handleMenuAside}>
          <FiMenu />
        </button>
      </div>
      <aside className={`menu-aside ${showMenuAside ? "" : "hide-menu"}`}>
        <h2>My Cookbook</h2>
        <ul className="nav-list">
          <Link className="header-nav-item" to="" onClick={handleMenuAside}>
            <FaHome />
            <span>Home</span>
          </Link>
          {user.username ? (
            <>
              <Link
                className="header-nav-item"
                to="/newrecipe"
                onClick={handleMenuAside}
              >
                <FaPlus />
                <span>New Recipe</span>
              </Link>
              <Link
                className="header-nav-item"
                to="/myrecipes"
                onClick={handleMenuAside}
              >
                <FaBook />
                <span>My Recipes</span>
              </Link>
              <Link className="header-nav-item" to="/">
                <FaSearch />
                <span>Search</span>
              </Link>
              <Link className="header-nav-item" to="/">
                <FaDice />
                <span>Surprise Me!</span>
              </Link>
              <Link className="header-nav-item" to="/">
                <FaRegUser />
                <span>Account</span>
              </Link>
              <Link className="header-nav-item" onClick={handleLogout} to="/">
                <FaSignOutAlt />
                <span>Sign Out</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                className="header-nav-item"
                onClick={handleMenuAside}
                to="/login"
              >
                Log In
              </Link>
              <Link
                className="header-nav-item"
                onClick={handleMenuAside}
                to="/signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </ul>
      </aside>
    </header>
  );
};

export default Header;

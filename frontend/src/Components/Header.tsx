import { useState } from "react";
import "../Styles/Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [showMenuAside, setShowMenuAside] = useState<Boolean>(false);

  const handleMenuAside = (): void => {
    setShowMenuAside((prev) => !prev);
  };

  return (
    <header className="header">
      <div className="header-nav">
        <h1>TS Cookbook</h1>
        <button onClick={handleMenuAside}>Menu</button>
      </div>
      <aside className={`menu-aside ${showMenuAside ? "" : "hide-menu"}`}>
        <h2>My Cookbook</h2>
        <ul className="nav-list">
          <Link className="header-nav-item" to="/home" onClick={handleMenuAside}>
            Home
          </Link>
          <Link className="header-nav-item" to="/myrecipes" onClick={handleMenuAside}>
            My Recipes
          </Link>
          <Link className="header-nav-item" to="/newrecipe" onClick={handleMenuAside}>
            New Recipe
          </Link>
          <Link className="header-nav-item" to="/">
            Search
          </Link>
          <Link className="header-nav-item" to="/">
            Surprise Me!
          </Link>
        </ul>
      </aside>
    </header>
  );
};

export default Header;

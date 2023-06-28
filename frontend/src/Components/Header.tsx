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
        <ul className="nav-list">
          <Link to="/myrecipes" onClick={handleMenuAside}>
            My Recipes
          </Link>
          <Link to="/newrecipe" onClick={handleMenuAside}>
            New Recipe
          </Link>
          <Link to="/">Search</Link>
        </ul>
      </aside>
    </header>
  );
};

export default Header;

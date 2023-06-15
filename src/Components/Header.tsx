import { useState } from "react";
import "../Styles/Header.css";

const Header = () => {
  const [showMenuAside, setShowMenuAside] = useState<Boolean>(false);
  const [showSearchAside, setShowSearchAside] = useState<Boolean>(false);

  const handleMenuAside = (): void => {
    if (showSearchAside) {
      setShowSearchAside(false);
    }

    setShowMenuAside((prev) => !prev);
  };

  const handleSearchAside = (): void => {
    if (showMenuAside) {
      setShowMenuAside(false);
    }

    setShowSearchAside((prev) => !prev);
  };
  
  return (
    <header className="header">
      <div className="header-nav">
        <button onClick={handleSearchAside}>Search</button>
        <h1>TS Cookbook</h1>
        <button onClick={handleMenuAside}>Menu</button>
      </div>
      <aside className={`menu-aside ${showMenuAside ? "" : "hide-menu"}`}>
        <ul className="nav-list">
          <li>Home</li>
          <li>Recipes</li>
          <li>Saved</li>
          <li>Settings</li>
        </ul>
      </aside>
      <aside className={`search-aside ${showSearchAside ? "" : "hide-search"}`}>
        <h1>Search for a recipe</h1>
        <input placeholder="Cookies..." />
        <button>Search</button>
      </aside>
    </header>
  );
};

export default Header;

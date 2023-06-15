import { useState } from "react";
import "../Styles/Header.css";

const Header = () => {
  const [showMenuAside, setShowMenuAside] = useState<Boolean>(false);

  return (
    <header className="header">
      <div className="header-nav">
        <button>Search</button>
        <h1>TS Cookbook</h1>
        <button onClick={() => setShowMenuAside((prev) => !prev)}>Menu</button>
      </div>
      <aside
        className={`header-links ${showMenuAside ? "" : "hide-menu"}`}
      >
        <ul className="nav-list">
          <li>Home</li>
          <li>Recipes</li>
          <li>Saved</li>
          <li>Settings</li>
        </ul>
      </aside>
    </header>
  );
};

export default Header;

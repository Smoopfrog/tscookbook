import { useState } from "react";
import "../Styles/Header.css";

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
          <button>My Recipes</button>
          <button>New Recipe</button>
          <button>Search</button>
          
        </ul>
      </aside>
    </header>
  );
};

export default Header;

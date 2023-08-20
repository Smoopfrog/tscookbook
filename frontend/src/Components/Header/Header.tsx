import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";
import SideBar from "./Sidebar";
import "../../Styles/Header.css";

interface HeaderProps {
  handleSidebar(): void;
}

const Header = ({ handleSidebar }: HeaderProps) => {
  const user = useAppSelector(selectUser);
  const path = useLocation().pathname;
  let isEditPath = false;

  if (path.substring(path.length - 4) === "edit") {
    isEditPath = true;
  }

  const headerClass = `header ${
    (path === "/newrecipe" || (path === "/" && !user.username) || isEditPath) &&
    "hide"
  }`;

  const headerNavClass = `header-nav 
  ${path === "/" && "hide-header-nav"} 
  ${(path === "/login" || path === "/signup") && "login-nav"}`;

  return (
    <header className={headerClass}>
      <div className={headerNavClass}>
        <div></div>
        <Link className="header-title-link" to="/">
          TS Cookbook
        </Link>
        {user.username ? (
          <button className="header-menu-btn" onClick={handleSidebar}>
            <FiMenu />
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </header>
  );
};

export default Header;

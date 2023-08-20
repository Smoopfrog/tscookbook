import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { useAppSelector } from "../../hooks";
import { selectUser } from "../../slices/userSlice";
import SideBar from "./SideBar";
import "../../Styles/Header.css";

const Header = () => {
  const [showMenuAside, setShowMenuAside] = useState<boolean>(false);
  const user = useAppSelector(selectUser);
  const path = useLocation().pathname;
  let isEditPath = false;

  if (path.substring(path.length - 4) === "edit") {
    isEditPath = true;
  }

  const handleMenuAside = (): void => {
    setShowMenuAside((prev) => !prev);
  };

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
          <button className="header-menu-btn" onClick={handleMenuAside}>
            <FiMenu />
          </button>
        ) : (
          <div></div>
        )}
      </div>

      <SideBar show={showMenuAside} handleMenuAside={handleMenuAside} />
    </header>
  );
};

export default Header;

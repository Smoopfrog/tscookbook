import SidebarLink from "../Buttons/SidebarLink";
import {
  FaHome,
  FaPlus,
  FaBook,
  FaRegUser,
  FaSignOutAlt,
  FaTags,
} from "react-icons/fa";

import * as UsersApi from "../../api/users_api";
import { useAppDispatch } from "../../hooks";
import { logout } from "../../slices/userSlice";
interface SideBarProps {
  show: boolean;
  handleMenuAside(): void;
}

const SideBar = ({ show, handleMenuAside }: SideBarProps) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    UsersApi.logout();
    handleMenuAside();
    dispatch(logout());
  };

  return (
    <aside className={`menu-aside ${show ? "" : "hide-menu"}`}>
      <ul className="nav-list">
        <SidebarLink route="" name="Home" handleMenuAside={handleMenuAside}>
          <FaHome />
        </SidebarLink>
        <SidebarLink
          route="/newrecipe"
          name="New Recipe"
          handleMenuAside={handleMenuAside}
        >
          <FaPlus />
        </SidebarLink>
        <SidebarLink
          name="My Recipes"
          route="/myrecipes"
          handleMenuAside={handleMenuAside}
        >
          <FaBook />
        </SidebarLink>
        <SidebarLink
          name="Tags"
          route="/tags"
          handleMenuAside={handleMenuAside}
        >
          <FaTags />
        </SidebarLink>
        <SidebarLink
          name="Account"
          route="/account"
          handleMenuAside={handleMenuAside}
        >
          <FaRegUser />
        </SidebarLink>
        <SidebarLink handleMenuAside={handleLogout} route="/" name="Sign Out">
          <FaSignOutAlt />
        </SidebarLink>
      </ul>
    </aside>
  );
};

export default SideBar;

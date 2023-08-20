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

interface SidebarProps {
  show: boolean;
  handleSidebar(): void;
}

const Sidebar = ({ show, handleSidebar }: SidebarProps) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    UsersApi.logout();
    handleSidebar();
    dispatch(logout());
  };

  return (
    <aside className={`menu-aside ${show ? "" : "hide-menu"}`}>
      <ul className="nav-list">
        <SidebarLink route="" name="Home" handleMenuAside={handleSidebar}>
          <FaHome />
        </SidebarLink>
        <SidebarLink
          route="/newrecipe"
          name="New Recipe"
          handleMenuAside={handleSidebar}
        >
          <FaPlus />
        </SidebarLink>
        <SidebarLink
          name="My Recipes"
          route="/myrecipes"
          handleMenuAside={handleSidebar}
        >
          <FaBook />
        </SidebarLink>
        <SidebarLink
          name="Tags"
          route="/tags"
          handleMenuAside={handleSidebar}
        >
          <FaTags />
        </SidebarLink>
        <SidebarLink
          name="Account"
          route="/account"
          handleMenuAside={handleSidebar}
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

export default Sidebar;

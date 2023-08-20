import { Link } from "react-router-dom";
import "../../Styles/Header.css"

interface SidebarLinkProps {
  handleMenuAside(event: React.MouseEvent<HTMLElement>): void;
  name:string;
  route: string;
  children: React.ReactNode;
}

const SidebarLink = ({handleMenuAside, name, route, children}: SidebarLinkProps) => {
  return (
    <Link className="header-nav-item" to={route} onClick={handleMenuAside}>
        {children}
      <span>{name}</span>@
    </Link>
  );
};

export default SidebarLink;

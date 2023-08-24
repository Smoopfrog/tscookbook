import { useState, useEffect } from "react";
import "../../Styles/Header.css";
import { Link } from "react-router-dom";

const HomepageHeader = () => {
  const [header, setHeader] = useState("header-top");
  const [mobileView, setMobileView] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobileView(true);
    }
  }, []);

  const listenScrollEvent = () => {
    if (window.scrollY > 0) {
      return setHeader("");
    } else if (window.scrollY < 1) {
      return setHeader("header-top");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenScrollEvent);

    return () => window.removeEventListener("scroll", listenScrollEvent);
  }, []);

  return (
    <header className={`header ${mobileView && header}`}>
      <div className="header-nav">
        <Link to="/" className="header-title-link">
          Flavourful Plates
        </Link>
        <Link to="/signup" className="header-link">
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default HomepageHeader;

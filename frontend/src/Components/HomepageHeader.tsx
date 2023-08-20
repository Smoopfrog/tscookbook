import { useState, useEffect } from "react";
import "../Styles/Header.css";
import { Link } from "react-router-dom";

const HomepageHeader = () => {
  const [header, setHeader] = useState("header-top");
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
    <header className={`header ${header}`}>
      <div className="header-nav">
        <Link to="/" className="header-title-link">
          TS Cookbook
        </Link>
        <Link to="/signup" className="header-link">
          Get Started
        </Link>
      </div>
    </header>
  );
};

export default HomepageHeader;

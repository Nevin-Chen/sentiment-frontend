import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search } from ".";
import "./Header.css";

const Header: React.FC = () => {
  const location = useLocation();
  const isHomepage = location.pathname === "/";

  return (
    <header className="header-container">
      <div className="header-left">
        <Link to={"/"}>
          <div className="logo">
            Sentiment<span className="logo-accent">AI</span>
          </div>
        </Link>
      </div>
      <div className="header-center">{!isHomepage && <Search />}</div>
      <div className="header-right"></div>
    </header>
  );
};

export default Header;

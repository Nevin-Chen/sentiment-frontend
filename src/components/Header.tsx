import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search } from ".";
import { useAuth } from "../hooks/auth";
import "./Header.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomepage = location.pathname === "/";
  const { user, isAuthenticated, loading, logout } = useAuth();

  return (
    <header className="header-container">
      <div className="header-left">
        <Link to={"/"}>
          <div className="logo">
            Sentiment<span className="logo-accent">AI</span>
          </div>
        </Link>
      </div>
      {!isAuthenticated ? null : (
        <div className="header-center">{!isHomepage && <Search />}</div>
      )}
      <div className="header-right">
        {loading ? null : isAuthenticated ? (
          <div className="header-user">
            <span className="header-welcome">
              {user?.name || user?.username}
            </span>
            <span className="header-icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="header-icon"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </span>
            <button className="header-logout" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <button className="header-login" onClick={() => navigate("/login")}>
            <span className="header-login-icon-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="header-login-icon"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
              </svg>
            </span>
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import axios from "axios";
import "./Search.css";
import { useAuth } from "../hooks/auth";
import { toast } from "react-toastify";

interface SearchProps {
  variant?: "header" | "home";
}

const Search: React.FC<SearchProps> = ({ variant = "header" }) => {
  const [query, setQuery] = useState("");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.warning(
        <span>
          <Link to="/login">Sign in</Link>{" "}<span>to start searching</span>
        </span>
      );
      return;
    }

    const sanitizedQuery = query.trim().toUpperCase();
    if (!sanitizedQuery) return;

    try {
      const url = `${API_URL}/stocks/${sanitizedQuery}/ohlc`;
      const { data } = await axios.get(url, {
        withCredentials: true
      });

      navigate(`/stocks/${sanitizedQuery}`, { state: data });
      setQuery("");
    } catch (error: any) {
      toast.error(error?.response?.data?.error)
    }
  };

  return (
    <div className={`search-${variant} search-container`}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ticker symbol"
          className="search-input"
        />
        <button className="search-button" disabled={!query}>
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="24" y1="24" x2="16.65" y2="16.65" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Search;

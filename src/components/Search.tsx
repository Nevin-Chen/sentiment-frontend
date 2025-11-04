import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFlash } from "../hooks/flash";
import "./Search.css";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

interface SearchProps {
  variant?: "header" | "home";
}

const Search: React.FC<SearchProps> = ({ variant = "header" }) => {
  const [query, setQuery] = useState("");
  const { setFlash } = useFlash();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSymbol = query.trim();
    if (!trimmedSymbol) return;

    try {
      const url = `${API_URL}/api/stocks/${trimmedSymbol}/ohlc`;
      const { data } = await axios.get(url);

      navigate(`/stocks/${trimmedSymbol.toUpperCase()}`, { state: data });
      setQuery("");
    } catch (error: any) {
      setFlash(error?.response?.data?.error);
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

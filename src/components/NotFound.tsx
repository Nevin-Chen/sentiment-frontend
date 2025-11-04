import { useNavigate } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-title">404</div>
      <p className="notfound-message">
        Oh no! The page you're looking for doesn't exist.
      </p>
      <button className="notfound-button" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
};

export default NotFound;

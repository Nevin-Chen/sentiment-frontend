import { useEffect } from "react";
import { useAuth } from "../hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { isAuthenticated, loading, loginWithAuth0, loginAsGuest } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/");
    }
  }, [loading, isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Logging in...</p>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="logo-container"></div>
          <h1>Sentiment AI</h1>
          <p>
            Learn to invest smarter with AI insights from charts and technical analysis.
          </p>
        </div>

        <div className="login-buttons">
          <button className="auth0-button" onClick={loginWithAuth0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 18 18"
              fill="currentColor"
              width="18"
            >
              <path d="M17 8h-1V6a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2Zm-5 9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3ZM9 8V6a3 3 0 0 1 6 0v2H9Z" />
            </svg>
            Sign in with Auth0
          </button>

          <div className="divider">
            <span>or</span>
          </div>

          <button className="guest-button" onClick={loginAsGuest}>
            Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

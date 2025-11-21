import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import { API_URL } from "../config/api";
import { api } from "../lib/axios";

export default function Callback() {
  const { getIdTokenClaims, isAuthenticated, isLoading } = useAuth0();
  const { authMe } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const exchangeToken = async () => {
      if (isLoading) return;

      if (!isAuthenticated) {
        navigate("/");
        return;
      }

      try {
        const idToken = (await getIdTokenClaims())?.__raw;
        if (!idToken) {
          throw new Error("No ID token received");
        }

        await api.post(
          `${API_URL}/auth/login`,
          { idToken },
          { withCredentials: true }
        );

        await authMe();
        navigate("/");
      } catch (err) {
        console.error("Token exchange failed:", err);
        setError("Login failed. Please try again.");

        setTimeout(() => navigate("/"), 2000);
      }
    };

    exchangeToken();
  }, [isAuthenticated, isLoading, getIdTokenClaims, authMe, navigate]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <div>Logging in...</div>;
}

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext, type AuthContextType } from "../hooks/auth";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config/api";
import { api } from "../lib/axios";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    isAuthenticated: auth0Authenticated,
    isLoading: auth0Loading,
    loginWithRedirect: auth0LoginWithRedirect,
    logout: auth0Logout,
  } = useAuth0();

  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isInitialMount = useRef(true);

  const isAuthenticated = !!user;

  const authMe = useCallback(async () => {
    try {
      const { data } = await api.get(
        `${API_URL}/auth/me`,
        {
          withCredentials: true
        }
      );
      setUser(data);
      return data;
    } catch {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current && !auth0Loading) {
      isInitialMount.current = false;
      authMe();
    }
  }, [auth0Loading, authMe]);

  const loginWithAuth0 = useCallback(async () => {
    await auth0LoginWithRedirect();
  }, [auth0LoginWithRedirect]);

  const loginAsGuest = useCallback(async () => {
    try {
      setLoading(true);
      await api.post(
        `${API_URL}/auth/guest`,
        {},
        { withCredentials: true }
      );
      await authMe();
      navigate("/");
    } catch (err) {
      console.error("Guest login failed:", err);
      setLoading(false);
    }
  }, [navigate, authMe]);

  const logout = useCallback(async () => {
    try {
      await api.post(
        `${API_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);

      if (auth0Authenticated) {
        auth0Logout({ logoutParams: { returnTo: window.location.origin } });
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, [auth0Authenticated, auth0Logout, navigate]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated,
      loading,
      loginWithAuth0,
      loginAsGuest,
      logout,
      authMe
    }),
    [user, isAuthenticated, loading, loginWithAuth0, loginAsGuest, logout, authMe]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

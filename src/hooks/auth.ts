import { createContext, useContext } from "react";

export interface AuthContextType {
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  loginWithAuth0: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  authMe: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

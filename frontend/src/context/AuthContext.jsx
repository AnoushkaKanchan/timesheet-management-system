import { createContext, useContext, useState } from "react";
import {
  setTokens,
  removeTokens,
} from "../utils/tokenStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const login = ({ access, refresh, user }) => {
    setTokens(access, refresh);

    setUser(user);

    setIsAuthenticated(true);
  };

  const logout = () => {
    removeTokens();

    setUser(null);

    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
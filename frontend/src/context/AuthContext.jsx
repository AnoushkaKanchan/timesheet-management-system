import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import {
  setTokens,
  removeTokens,
  getAccessToken,
} from "../utils/tokenStorage";

import { getCurrentUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isAuthenticated, setIsAuthenticated] =
    useState(false);

  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getAccessToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const currentUser =
          await getCurrentUser();

        setUser(currentUser);

        setIsAuthenticated(true);
      } catch (error) {
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
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
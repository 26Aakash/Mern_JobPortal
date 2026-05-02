import { createContext, useCallback, useEffect, useMemo, useState } from "react";

import api, { clearStoredAuth, getStoredAuth, persistAuth } from "../services/api";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function hydrateAuth() {
      const storedAuth = getStoredAuth();

      if (storedAuth?.token && storedAuth?.user) {
        setToken(storedAuth.token);
        setUser(storedAuth.user);

        try {
          const response = await api.get("/auth/me");
          persistAuth({
            token: storedAuth.token,
            user: response.data.user,
          });
          setUser(response.data.user);
        } catch (_error) {
          clearStoredAuth();
          setToken(null);
          setUser(null);
        }
      }

      setLoading(false);
    }

    hydrateAuth();
  }, []);

  const register = async (payload) => {
    const response = await api.post("/auth/register", payload);
    const nextAuth = response.data;

    persistAuth(nextAuth);
    setToken(nextAuth.token);
    setUser(nextAuth.user);

    return nextAuth.user;
  };

  const login = async (payload) => {
    const response = await api.post("/auth/login", payload);
    const nextAuth = response.data;

    persistAuth(nextAuth);
    setToken(nextAuth.token);
    setUser(nextAuth.user);

    return nextAuth.user;
  };

  const logOut = () => {
    clearStoredAuth();
    setToken(null);
    setUser(null);
  };

  const updateProfile = useCallback(async (payload) => {
    const response = await api.put("/auth/profile", payload);
    const nextUser = response.data.user;

    persistAuth({
      token,
      user: nextUser,
    });
    setUser(nextUser);

    return nextUser;
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: Boolean(user && token),
      register,
      login,
      logOut,
      updateProfile,
    }),
    [loading, token, updateProfile, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

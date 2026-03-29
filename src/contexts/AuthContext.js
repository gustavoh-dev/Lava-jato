import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AUTH_STORAGE_KEY = 'lavajato.auth';

const defaultSession = {
  isAuthenticated: false,
  user: null,
};

const AuthContext = createContext({
  ...defaultSession,
  login: async () => false,
  logout: () => {},
});

function readStoredSession() {
  const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedValue) {
    return defaultSession;
  }

  try {
    return JSON.parse(storedValue);
  } catch (error) {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return defaultSession;
  }
}

function createAuthenticatedSession(user) {
  return {
    isAuthenticated: true,
    user,
  };
}

function AuthProvider({ children }) {
  const [session, setSession] = useState(defaultSession);

  useEffect(() => {
    setSession(readStoredSession());
  }, []);

  async function login({ email, password }) {
    const allowedEmail = process.env.REACT_APP_AUTH_EMAIL || 'admin@lavajato.com';
    const allowedPassword = process.env.REACT_APP_AUTH_PASSWORD || '123456';

    if (email !== allowedEmail || password !== allowedPassword) {
      return false;
    }

    const nextSession = createAuthenticatedSession({
      nome: 'Administrador',
      email,
    });

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextSession));
    setSession(nextSession);
    return true;
  }

  function logout() {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setSession(defaultSession);
  }

  const value = useMemo(
    () => ({
      ...session,
      login,
      logout,
    }),
    [session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };

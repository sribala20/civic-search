import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext<{
  loggedIn: boolean;
  admin: boolean;
  setLoggedIn?: (loggedIn: boolean) => void;
  setAdmin?: (admin: boolean) => void;
}>({
  loggedIn: false,
  admin: false,
  setLoggedIn: () => {},
  setAdmin: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(false);

  // save the state to local storage

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    const admin = localStorage.getItem("admin");

    if (loggedIn) {
      setLoggedIn(true);
    }

    if (admin) {
      setAdmin(true);
    }
  }, []);

  useEffect(() => {
    if (loggedIn) {
      localStorage.setItem("loggedIn", "true");
    } else {
      localStorage.removeItem("loggedIn");
    }
  }, [loggedIn]);

  useEffect(() => {
    if (admin) {
      localStorage.setItem("admin", "true");
    } else {
      localStorage.removeItem("admin");
    }
  }, [admin]);

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        admin,
        setLoggedIn,
        setAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const c = useContext(AuthContext);
  if (!c) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return c;
};

export { AuthProvider, useAuth };

import { useState, useEffect, useContext } from "react";

// CONTEXTS
import { AuthContext } from "../contexts/AuthContext";

const useIsAuthenticated = () => {
  const auth = useContext(AuthContext);

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    auth.checkInLocalStorage();
  }, []);

  useEffect(() => {
    setIsAuthenticated(
      auth.state.authenticated
        ? true
        : auth.state.authenticated !== null
        ? false
        : null
    );
  }, [auth.state]);

  return isAuthenticated;
};

export default useIsAuthenticated;

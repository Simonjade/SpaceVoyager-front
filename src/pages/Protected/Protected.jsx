import { useEffect } from "react";

// COMPONENTS
import ProtectedZone from "../components/Protected";

// HOOKS
import useIsAuthenticated from "../hooks/useIsAuthenticated";

const Protected = () => {
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated) console.log("pro", isAuthenticated);
  }, [isAuthenticated]);

  return (
    <ProtectedZone to={"/login"}>
      <div>
        <p>Coucou les protégés !</p>
      </div>
    </ProtectedZone>
  );
};

export default Protected;

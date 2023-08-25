import { Navigate } from "react-router-dom";

// HOOKS
import useIsAuthenticated from "../hooks/useIsAuthenticated";

const ProtectedZone = ({ to = "/", children }) => {
    const isAuthenticated = useIsAuthenticated();

    if (isAuthenticated === false) return <Navigate to={to} replace />;
    if (isAuthenticated === true) return children;
};
export default ProtectedZone;

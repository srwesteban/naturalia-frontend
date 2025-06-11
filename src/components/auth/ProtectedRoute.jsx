import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ roles, children }) => {
  const { isAuthenticated, effectiveRole, loading } = useAuth();

  if (loading) return null;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (roles && !roles.includes(effectiveRole)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;

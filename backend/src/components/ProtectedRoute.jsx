import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) return <Navigate to="/login" />;

  // Optional: Role-based protection
  if (allowedRoles && !allowedRoles.some(role => user?.[role])) {
    return <Navigate to="/" />; // or a "Not Authorized" page
  }

  return children;
};

export default ProtectedRoute;

// src/components/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  // If no user is logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user matches
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;

import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type PrivateRouteProps = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authContext = useContext(AuthContext);
  const location = useLocation();

  if (!authContext) {
    return <Navigate to="/admin/login" />;
  }

  const { isAuthenticated } = authContext;

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  if (location.pathname === "/admin" && isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }
  if (location.pathname === "/admin/" && isAuthenticated) {
    return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export default PrivateRoute;

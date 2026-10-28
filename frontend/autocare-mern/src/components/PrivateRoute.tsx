import { useContext, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("PrivateRoute must be used within AuthProvider");
  }

  const { user, loading } = authContext;
  if (loading) {
    return null;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "./Header";

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth ? (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;

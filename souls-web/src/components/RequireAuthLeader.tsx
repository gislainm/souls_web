import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuthLeader";
import LeaderHeader from "./LeaderHeader";

const RequireAuthLeader = () => {
  const { auth } = useAuth();
  const location = useLocation();
  return auth ? (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <LeaderHeader />
      <Outlet />
    </div>
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuthLeader;

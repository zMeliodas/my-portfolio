import { useAuth } from "../auth/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-backgroundColor">
        <p className="font-mono text-white/60 text-sm">Loading...</p>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
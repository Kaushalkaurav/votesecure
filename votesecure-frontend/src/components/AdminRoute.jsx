import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function AdminRoute() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;

  return <Outlet />;
}

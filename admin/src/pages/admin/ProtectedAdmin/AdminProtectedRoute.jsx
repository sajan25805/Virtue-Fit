import { useEffect } from "react";
import { useAdminAuthStore } from "../../../store/adminAuthStore"; 
import { useNavigate } from "react-router-dom";

export default function AdminProtectedRoute({ children }) {
  const { admin, isLoading, checkAuth } = useAdminAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading && !admin) navigate("/admin/login");
  }, [admin, isLoading]);

  if (isLoading) return <div className="text-center mt-20">Checking admin session...</div>;
  return <>{children}</>;
}

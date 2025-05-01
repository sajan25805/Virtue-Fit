// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/auth-store";

export function ProtectedRoute({ children }) {
  const { trainer } = useAuthStore();

  if (!trainer) {
    return <Navigate to="/trainer/login" replace />;
  }

  return children;
}

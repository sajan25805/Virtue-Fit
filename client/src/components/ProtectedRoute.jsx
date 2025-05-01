// components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isChecking = useAuthStore((state) => state.isChecking);

  if (isChecking) return null; // or a spinner while checking

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

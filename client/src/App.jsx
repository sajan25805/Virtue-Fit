import React, { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { useAuthStore } from "./store/authStore";

// Layouts
import AppLayout from "./layouts/AppLayout";
import MainLayout from "./layouts/MainLayout";

// Pages
import SignUp from "./pages/SignUp";
import Login from "./pages/Login/Login";
import AboutUs from "./pages/AboutUs";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import WorkoutPage from "./pages/workout/WorkoutPage";
import WorkoutDetailPage from "./pages/workout/WorkoutDetailPage";
import MealPage from "./pages/mealsSnacks/MealPage";
import MealDetailPage from "./pages/mealsSnacks/MealDetailPage";
import SnackPage from "./pages/mealsSnacks/SnackPage";
import SnackDetailPage from "./pages/mealsSnacks/SnackDetailPage";
import ErrorPage from "./pages/ErrorPage";

// ✅ Protected route wrapper
import ProtectedRoute from "./components/ProtectedRoute";

// ✅ App routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "sign-up", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "/", element: <AboutUs /> },
      { path: "verify-email", element: <EmailVerificationPage /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "workout",
        element: (
          <ProtectedRoute>
            <WorkoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "workout/:id",
        element: (
          <ProtectedRoute>
            <WorkoutDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "meal",
        element: (
          <ProtectedRoute>
            <MealPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "meal/:id",
        element: (
          <ProtectedRoute>
            <MealDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "snack",
        element: (
          <ProtectedRoute>
            <SnackPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "snack/:id",
        element: (
          <ProtectedRoute>
            <SnackDetailPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isChecking = useAuthStore((state) => state.isChecking);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isChecking) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0E0E2C] to-[#1f1f3a] text-white"
      >
        <div className="flex flex-col items-center gap-4">
          <svg
            className="animate-spin h-8 w-8 text-green-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
            />
          </svg>
          <p className="text-sm text-gray-300 font-medium">Checking your session...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <RouterProvider router={router} />
    </>
  );
}

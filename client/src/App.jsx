import React from "react";
import SignUp from "./pages/SignUp";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import MainLayout from "./layouts/MainLayout";
import WorkoutPage from "./pages/workout/WorkoutPage";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login/Login";
import WorkoutDetailPage from "./pages/workout/WorkoutDetailPage";
import MealPage from "./pages/mealsSnacks/MealPage";
import MealDetailPage from "./pages/mealsSnacks/MealDetailPage";
import SnackPage from "./pages/mealsSnacks/SnackPage";
import SnackDetailPage from "./pages/mealsSnacks/SnackDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <>Error</>,
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "/",
        element: <AboutUs/>,
      },
      {
        path: "verify-email",
        element: <EmailVerificationPage />,
      },
    ],
  },
  { path: "login", element: <> </>, errorElement: <ErrorPage /> },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <>Error</>,
    children: [
      {
        path: "/workout",
        element: <WorkoutPage />,
      },
      {
        path:"/workout/:id",
        element: <WorkoutDetailPage/>
      },
      {
        path: "/meal",
        element: <MealPage />,
      },
      {
        path:"/meal/:id",
        element: <MealDetailPage/>
      },
      {
        path: "/snack",
        element: <SnackPage />,
      },
      {
        path:"/snack/:id",
        element: <SnackDetailPage/>
      }
    ],
  },
]);


export default function App() {
  return <RouterProvider router={router} />;
}

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
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

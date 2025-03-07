import React from "react";
import SignUp from "./pages/SignUp";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import EmailVerificationPage from "./pages/EmailVerificationPage";

// import BlogPage from "./pages/BlogPage";
// import BlogDetail from "./pages/BlogDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout/>,
    errorElement: <>Error</>,
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "login",
        element: <>Log In </>,
      },
      {
        path: "about-us",
        element: <>About Us</>,
      },
      {
        path: "verify-email",
        element: <EmailVerificationPage />,
      },

      // {
      //   path: "blog",
      //   element: <BlogPage/>,
      //   children: [
      //     {
      //       path:"/1",
      //       element: <BlogDetail/>
      //     }
      //   ]
      // },
      
    ],
  },
  { path: "login", element: <> </>, errorElement: <ErrorPage /> },
]);

export default function App() {
  return <RouterProvider router={router} />;

};

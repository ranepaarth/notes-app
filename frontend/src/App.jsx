import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.css";
import AppLayout from "./layout/AppLayout";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import FAQPage from "./pages/FAQPage";
import FeaturesPage from "./pages/FeaturesPage";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "/signup",
          element: <SignUpPage />,
        },
        {
          path: "/signin",
          element: <SignInPage />,
        },
        {
          path: "/mynotes",
          element: <NotesPage />,
        },
        {
          path: "/features",
          element: <FeaturesPage />,
        },
        {
          path: "/faq",
          element: <FAQPage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
      ],
    },
    { path: "*", element: <ErrorPage /> },
  ]);
  return <RouterProvider router={router} />;
};

export default App;

import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Paavains from "./Pages/Paavains";
import PageAllDiscussions from "./Pages/PageAllDiscussions";
import Contributions from "./Pages/Contributions";
import ErrorPage from "./Pages/ErrorPage";
import App from "./App";

import Cookies from "js-cookie";

const token = Cookies.get("token");

export default createBrowserRouter([
    {
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: token ? (
                    <Home />
                ) : (
                    <Navigate to="/login" replace={true} />
                ),
            },
            {
                path: "/profile",
                element: <Profile />,
            },
            {
                path: "/paavaians",
                element: <Paavains />,
            },
            {
                path: "/discussions",
                element: <PageAllDiscussions />,
            },
            {
                path: "/contributions",
                element: <Contributions />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
]);

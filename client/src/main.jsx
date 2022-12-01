import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
// import router from "./routes.js";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Paavaians from "./Pages/Paavaians";
import PaavaianDetails from "./Pages/PaavaianDetails";
import Discussions from "./Pages/Discussions";
import Contributions from "./Pages/Contributions";
import ErrorPage from "./Pages/ErrorPage";
import Notifications from "./Pages/Notifications";
import App from "./App";

import Cookies from "js-cookie";
import CheckAuth from "./utils/CheckAuth";
import GuestAuth from "./utils/GuestAuth";

// redux
import { Provider } from 'react-redux'
import store from './store/index.js'
import DiscussionSingle from './Pages/DiscussionSingle';



const token = Cookies.get("token");
const router = createBrowserRouter([
    {
        element: <App />,
        // errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: (
                    <CheckAuth>
                        <Home />
                    </CheckAuth>
                ),
            },
            {
                path: "/profile",
                element: (
                    <CheckAuth>
                        <Profile />
                    </CheckAuth>),
            },
            {
                path: "/paavaians",
                element: (
                    <CheckAuth>
                        <Paavaians />
                    </CheckAuth>),
            },
            {
                path: "/paavaians/:id",
                element: (
                    <CheckAuth>
                        <PaavaianDetails />
                    </CheckAuth>),
            },
            {
                path: "/discussions",
                element: (
                    <CheckAuth>
                        <Discussions />
                    </CheckAuth>),
            },
            {
                path: "/discussions/:id",
                element: (
                    <CheckAuth>
                        <DiscussionSingle />
                    </CheckAuth>),
            },
            {
                path: "/contributions",
                element: (
                    <CheckAuth>
                        <Contributions />
                    </CheckAuth>),
            },
            {
                path: "/approve",
                element: (
                    <CheckAuth>
                        <Notifications />
                    </CheckAuth>),
            },
        ],
    },
    {
        path: "/login",
        element: (
            <GuestAuth>
                <Login />
            </GuestAuth>),
    },
    {
        path: "/signup",
        element: (
            <GuestAuth>
                <Signup />
            </GuestAuth>),
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);

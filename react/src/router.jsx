import { createBrowserRouter } from "react-router-dom";
import Default from "./layouts/Default";
import Guest from "./layouts/Guest";
import Community from "./views/Community";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Messages from "./views/Messages";
import Notifications from "./views/Notifications";
import Post from "./views/Post";
import Profile from "./views/Profile";
import Register from "./views/Register";

const router = createBrowserRouter([
    {
        element: <Default />,
        children: [
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/profile/:id?',
                element: <Profile />
            },
            {
                path: '/notifications',
                element: <Notifications />
            },
            {
                path: '/community',
                element: <Community />
            },
            {
                path: '/messages',
                element: <Messages />
            },

        ]
    },

    {
        element: <Guest/>,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    }
])

export default router

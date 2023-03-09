import { createBrowserRouter } from "react-router-dom";
import Default from "./layouts/Default";
import Guest from "./layouts/Guest";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
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
                path: '/me',
                element: <Profile />
            }
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

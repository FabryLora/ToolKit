import { createBrowserRouter } from "react-router-dom";
import { DefaultLayout } from "./layouts/DefaultLayout";
import { GuestLayout } from "./layouts/GuestLayout";
import Calculator from "./pages/Calculator";
import { DefaultHome } from "./pages/DefaultHome";
import { Home } from "./pages/GuestHome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const router = createBrowserRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/",
                element: <DefaultHome />,
            },
            {
                path: "/calculator",
                element: <Calculator />,
            },
        ],
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/guesthome",
                element: <Home />,
            },
            {
                path: "/login",
                element: <Login />,
            },
            {
                path: "/signup",
                element: <Signup />,
            },
        ],
    },
]);

export default router;

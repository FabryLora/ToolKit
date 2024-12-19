import { Link, Navigate, Outlet } from "react-router-dom";
import logo from "../assets/logos/logo-transparent.webp";
import { useStateContext } from "../contexts/ContextProvider";
export const GuestLayout = () => {
    const { userToken } = useStateContext();

    if (userToken) {
        return <Navigate to="/" />;
    }

    return (
        <>
            <div className="p-4 flex flex-row items-center justify-center fixed w-full top-0">
                <Link to="/">
                    <img className="w-[200px]" src={logo} alt="Logo" />
                </Link>
                <div className="ml-auto absolute right-5 flex flex-row gap-3 max-sm:hidden">
                    <Link
                        className="px-4 py-2 rounded-md bg-secondary text-primary font-bold"
                        to="/login"
                    >
                        LOG IN
                    </Link>
                    <Link
                        className="px-4 py-2 rounded-md bg-secondary text-primary font-bold"
                        to="/signup"
                    >
                        SIGN UP
                    </Link>
                </div>
            </div>

            <div>
                <Outlet />
            </div>
        </>
    );
};

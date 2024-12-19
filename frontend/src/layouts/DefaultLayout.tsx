import {
    faBars,
    faCalculator,
    faClock,
    faNoteSticky,
    faStopwatch,
    faUser,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import appGrid from "../assets/icons/app-grid.svg";
import logo from "../assets/logos/logo-transparent.webp";
import axiosClient from "../axios";
import AppButton from "../components/AppButton";
import { useStateContext } from "../contexts/ContextProvider";

export const DefaultLayout = () => {
    const [userBox, setUserBox] = useState(false);
    const [appMenu, setAppMenu] = useState(false);
    const [mobileMenu, setMobileMenu] = useState(false);
    const { userToken, setUserToken, currentUser, setCurrentUser } =
        useStateContext();

    useEffect(() => {
        axiosClient
            .get("/me")
            .then(({ data }) => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.error("Error fetching user data:", err);
            });
    }, [setCurrentUser]);

    if (!userToken) {
        return <Navigate to={"guesthome"} />;
    }

    const pageLinks = [
        { title: "Home", href: "/" },
        { title: "Calculator", href: "/calculator" },
    ];

    const appButtonAttributes = [
        { icon: faCalculator, href: "/calculator" },
        { icon: faNoteSticky, href: "#" },
        { icon: faClock, href: "#" },
        { icon: faStopwatch, href: "#" },
        { icon: faNoteSticky, href: "#" },
        { icon: faNoteSticky, href: "#" },
    ];

    const logout = (ev: React.MouseEvent) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUserToken("");
        });
    };
    return (
        <>
            <AnimatePresence>
                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute h-screen w-screen z-10 bg-transparen-black"
                    >
                        <motion.div
                            initial={{ x: -200 }}
                            animate={{ x: 0 }}
                            exit={{ x: -200 }}
                            transition={{
                                duration: 0.2,
                                ease: "easeInOut",
                            }}
                            className="absolute z-20 flex flex-col p-4 h-screen w-[70%] bg-primary-dark text-white"
                        >
                            <div className="flex items-start justify-end">
                                <button onClick={() => setMobileMenu(false)}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size="xl"
                                        color="#EB5E28"
                                    />
                                </button>
                            </div>

                            <div className="border-b pb-2 border-secondary">
                                <p className="font-bold">{currentUser?.name}</p>
                                <p className="text-gray-400 break-words">
                                    {currentUser?.email}
                                </p>
                            </div>

                            <div className="py-2 flex flex-col gap-2 border-b border-secondary">
                                {pageLinks.map((pageLink, index) => (
                                    <Link key={index} to={pageLink.href}>
                                        {pageLink.title}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="p-4 flex flex-row items-center justify-center fixed w-full top-0">
                <Link to="/">
                    <img className="w-[200px]" src={logo} alt="Logo" />
                </Link>
                <div className="absolute right-5 flex flex-row gap-3 max-sm:hidden">
                    <div>
                        <button
                            onClick={() => {
                                setAppMenu(!appMenu);
                                setUserBox(false);
                            }}
                            className="w-10 h-10 hover:bg-[rgba(250,250,250,0.2)] rounded-md"
                        >
                            <img src={appGrid} alt="app grid icon" />
                        </button>
                        <AnimatePresence>
                            {appMenu && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-12 w-[200px] text-start bg-primary-dark p-4 rounded-md text-white right-14 flex flex-row flex-wrap gap-2 justify-evenly"
                                >
                                    {appButtonAttributes.map(
                                        (appButtonAttribute, index) => (
                                            <AppButton
                                                key={index}
                                                icon={appButtonAttribute.icon}
                                                href={appButtonAttribute.href}
                                            />
                                        )
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div
                        onClick={() => {
                            setUserBox(!userBox);
                            setAppMenu(false);
                        }}
                        className="w-10 h-10 flex justify-center items-center rounded-md bg-secondary relative cursor-pointer"
                    >
                        <FontAwesomeIcon
                            icon={faUser}
                            size="xl"
                            color="#252422"
                        />
                        <AnimatePresence>
                            {userBox && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="absolute top-12 text-start bg-primary-dark p-4 rounded-md text-white right-0 flex flex-col"
                                >
                                    <p className="font-bold">
                                        {currentUser?.name}
                                    </p>
                                    <p className="text-gray-400">
                                        {currentUser?.email}
                                    </p>
                                    <button
                                        onClick={logout}
                                        className="mt-2 bg-secondary text-white p-2 rounded-md font-bold"
                                    >
                                        Logout
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
                <div className="sm:hidden absolute left-10">
                    <button onClick={() => setMobileMenu(!mobileMenu)}>
                        <FontAwesomeIcon
                            icon={faBars}
                            color="#EB5E28"
                            size="xl"
                        />
                    </button>
                </div>
            </div>

            <div>
                <Outlet />
            </div>
        </>
    );
};

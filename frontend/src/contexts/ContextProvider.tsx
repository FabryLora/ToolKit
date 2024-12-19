import React, { createContext, useContext, useState } from "react";

interface User {
    name: string;
    email: string;
}

interface StateContextType {
    userToken: string;
    currentUser?: User | null;
    setCurrentUser: (user: User | null) => void;
    setUserToken: (token: string) => void;
}

interface ContextProviderPorps {
    children: React.ReactNode;
}

const StateContext = createContext<StateContextType>({
    userToken: "",
    currentUser: null,
    setCurrentUser: () => {},
    setUserToken: () => {},
});

export const ContextProvider = ({ children }: ContextProviderPorps) => {
    const [userToken, _setUserToken] = useState(
        localStorage.getItem("TOKEN") || ""
    );
    const [currentUser, setCurrentUser] = useState<User | null>();
    const setUserToken = (token: string) => {
        if (token) {
            localStorage.setItem("TOKEN", token);
        } else {
            localStorage.removeItem("TOKEN");
        }
        _setUserToken(token);
    };

    return (
        <StateContext.Provider
            value={{
                userToken,
                setUserToken,
                currentUser,
                setCurrentUser,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);

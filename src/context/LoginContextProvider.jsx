import React, { createContext } from "react";

export const LoginContext = createContext();
export default function LoginContextProvider({ children, isLogin, setLogin }) {
    const userId = "00001";
    const username = "root";
    return (
        <LoginContext.Provider
            value={{
                isLogin,
                setLogin,
                userId,
                username,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

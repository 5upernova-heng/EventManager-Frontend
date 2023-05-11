import React, { createContext } from "react";

export const LoginContext = createContext();
export default function LoginContextProvider({ children, isLogin, setLogin }) {
    return (
        <LoginContext.Provider
            value={{
                isLogin,
                setLogin,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

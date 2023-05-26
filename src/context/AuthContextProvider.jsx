import React, { useState, createContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [auth, setAuth] = useState(2);
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
}

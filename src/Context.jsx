import { useState, createContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext();

function Context({ children }) {
    // Authority Level
    const [auth, setAuth] = useState(1);

    return (
        <>
            <ToastContainer />
            <AuthContext.Provider value={{ auth, setAuth }}>
                {children}
            </AuthContext.Provider>
        </>
    );
}

export default Context;

import { createContext, useState } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NavBar from "./components/NavBar";
import routes from "./routes";
import TimeContextProvider from "./context/TimeContextProvider";
import AlarmContextProvider from "./context/AlarmContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";

export const LoginContext = createContext();

function App() {
    // Login
    const [isLogin, setLogin] = useState(false);

    const renderRoutes = () => {
        return (
            <Routes>
                <Route path="/" element={<Navigate to="/calendar" />} />
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            route.showBar ? (
                                <>
                                    <NavBar /> {route.element}
                                </>
                            ) : (
                                route.element
                            )
                        }
                    />
                ))}
            </Routes>
        );
    };
    return (
        <>
            <ToastContainer />
            <LoginContext.Provider
                value={{
                    isLogin,
                    setLogin,
                }}
            >
                <AuthContextProvider>
                    <TimeContextProvider>
                        <AlarmContextProvider>
                            {renderRoutes()};
                        </AlarmContextProvider>
                    </TimeContextProvider>
                </AuthContextProvider>
            </LoginContext.Provider>
        </>
    );
}

export default App;

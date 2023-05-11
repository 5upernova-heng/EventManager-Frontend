import { Navigate, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import routes from "./routes";
import Context from "./Context";
import { createContext, useState } from "react";
import TimeContextProvider from "./context/TimeContextProvider";
import AlarmContextProvider from "./context/AlarmContextProvider";

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
        <LoginContext.Provider
            value={{
                isLogin,
                setLogin,
            }}
        >
            <TimeContextProvider>
                <AlarmContextProvider>
                    <Context>{renderRoutes()}</Context>;
                </AlarmContextProvider>
            </TimeContextProvider>
        </LoginContext.Provider>
    );
}

export default App;

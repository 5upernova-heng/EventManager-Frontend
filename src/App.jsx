import { Navigate, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import routes from "./routes";
import TimeContextProvider from "./context/TimeContextProvider";
import AlarmContextProvider from "./context/AlarmContextProvider";
import AuthContextProvider from "./context/AuthContextProvider";
import LoginContextProvider from "./context/LoginContextProvider";
import MapContextProvider from "./context/MapContextProvider";
import { useState } from "react";
import EventContextProvider from "./context/EventContextProvider";
import GroupContextProvider from "./context/GroupContextProvider";
import SearchContextProvider from "./context/SearchContextProvider";

function App() {
    // Login
    const [isLogin, setLogin] = useState(true);
    const defaultPage = <Navigate to={isLogin ? "/dashboard" : "/login"} />;
    const rootPageRoute = <Route path="/" element={defaultPage} />;
    const renderRoutes = () => {
        return (
            <Routes>
                {rootPageRoute}
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
            <LoginContextProvider isLogin={isLogin} setLogin={setLogin}>
                <AuthContextProvider>
                    <TimeContextProvider>
                        <EventContextProvider>
                            <AlarmContextProvider>
                                <MapContextProvider>
                                    <GroupContextProvider>
                                        <SearchContextProvider>
                                            {renderRoutes()};
                                        </SearchContextProvider>
                                    </GroupContextProvider>
                                </MapContextProvider>
                            </AlarmContextProvider>
                        </EventContextProvider>
                    </TimeContextProvider>
                </AuthContextProvider>
            </LoginContextProvider>
        </>
    );
}

export default App;

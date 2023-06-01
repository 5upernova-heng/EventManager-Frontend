import { Navigate, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import routes from "./routes";
import TimeContextProvider from "./context/TimeContextProvider";
import AlarmContextProvider from "./context/AlarmContextProvider";
import LoginContextProvider from "./context/LoginContextProvider";
import MapContextProvider from "./context/MapContextProvider";
import { useState } from "react";
import EventContextProvider from "./context/EventContextProvider";
import GroupContextProvider from "./context/GroupContextProvider";
import SearchContextProvider from "./context/SearchContextProvider";
import "/src/styles/App.css";
import Login from "./pages/Login";

function App() {
    // Login
    const [isLogin, setLogin] = useState(false);
    const defaultPage = <Navigate to={isLogin ? "/dashboard" : "/login"} />;
    const rootPageRoute = <Route path="/" element={defaultPage} />;
    const renderRoutes = () => {
        if (isLogin) {
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
        } else {
            return <Login />;
        }
    };
    return (
        <>
            <div className="background"></div>
            <TimeContextProvider>
                <LoginContextProvider isLogin={isLogin} setLogin={setLogin}>
                    <EventContextProvider>
                        <MapContextProvider>
                            <GroupContextProvider>
                                <SearchContextProvider>
                                    {renderRoutes()};
                                </SearchContextProvider>
                            </GroupContextProvider>
                        </MapContextProvider>
                    </EventContextProvider>
                </LoginContextProvider>
            </TimeContextProvider>
        </>
    );
}

export default App;

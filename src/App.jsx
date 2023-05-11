import { Navigate, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import routes from "./routes";
import Context from "./Context";

function App() {
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
    return <Context>{renderRoutes()}</Context>;
}

export default App;

import { Navigate, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Calendar from "./pages/Calendar";
import Alarms from "./pages/Alarms";
import Map from "./pages/Map";
import Logs from "./pages/Logs";

function App() {
    const routes = [
        { path: "/calendar", label: "日程日历", element: <Calendar /> },
        { path: "/map", label: "校园地图", element: <Map /> },
        { path: "/alarms", label: "闹钟管理", element: <Alarms /> },
        { path: "/logs", label: "查看日志", element: <Logs /> },
    ];

    return (
        <>
            <NavBar routes={routes} />
            <Routes>
                <Route path="/" element={<Navigate to="/calendar" />} />
                {routes.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                    />
                ))}
            </Routes>
        </>
    );
}

export default App;

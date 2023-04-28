import NavBar from "./components/NavBar";
import Calendar from "./pages/Calendar";
import Alarms from "./pages/Alarms";
import Map from "./pages/Map";
import Logs from "./pages/Logs";
import { Navigate, Routes, Route } from "react-router-dom";
import { useState, useEffect, useContext, createContext } from "react";

export const TimeContext = createContext();
function App() {
    const routes = [
        { path: "/calendar", label: "日程日历", element: <Calendar /> },
        { path: "/map", label: "校园地图", element: <Map /> },
        { path: "/alarms", label: "闹钟管理", element: <Alarms /> },
        { path: "/logs", label: "查看日志", element: <Logs /> },
    ];
    const [date, setDate] = useState(new Date());
    const [tick, setTick] = useState(true);
    const [sync, setSync] = useState(true);
    const [timeInterval, setTimeInterval] = useState(1);

    useEffect(() => {
        if (tick || sync) {
            const interval = setInterval(() => {
                setDate(
                    sync
                        ? new Date()
                        : (prevDate) => {
                              const newDate = new Date(prevDate);
                              newDate.setSeconds(
                                  newDate.getSeconds() + timeInterval
                              );
                              return newDate;
                          }
                );
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [sync, tick, timeInterval]);
    const toggleTick = () => {
        if (tick) {
            setSync(false);
        }
        setTick(!tick);
    };
    const toggleSync = () => {
        setSync(!sync);
    };

    return (
        <>
            <TimeContext.Provider
                value={{
                    tick,
                    toggleTick,
                    date,
                    setDate,
                    sync,
                    toggleSync,
                    timeInterval,
                    setTimeInterval,
                }}
            >
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
            </TimeContext.Provider>
        </>
    );
}

export default App;

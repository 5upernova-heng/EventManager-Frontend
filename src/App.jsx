import NavBar from "./components/NavBar";
import Calendar from "./pages/Calendar";
import Alarms from "./pages/Alarms";
import Map from "./pages/Map";
import Logs from "./pages/Logs";
import { Navigate, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import {
    getAlarmApi,
    updateAlarmApi,
    deleteAlarmApi,
    addAlarmApi,
} from "./api/alarmApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const TimeContext = createContext();
export const AlarmContext = createContext();
function App() {
    // routes
    const routes = [
        { path: "/calendar", label: "日程日历", element: <Calendar /> },
        { path: "/map", label: "校园地图", element: <Map /> },
        { path: "/alarms", label: "闹钟管理", element: <Alarms /> },
        { path: "/logs", label: "查看日志", element: <Logs /> },
    ];

    //time
    const [date, setDate] = useState(new Date());
    const [tick, setTick] = useState(true);
    const [sync, setSync] = useState(true);
    const [timeInterval, setTimeInterval] = useState(1);

    useEffect(() => {
        if (tick || sync) {
            if (sync) setTick(true);
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

    // alarms
    const [alarms, setAlarms] = useState([]);
    const [ringed, setRinged] = useState([]);

    useEffect(() => {
        // mount alarm data
        const fetchAlarms = async () => {
            const { data } = await getAlarmApi();
            setAlarms(data);
        };
        fetchAlarms();
    }, []);

    useEffect(() => {
        // Clear alarmed array
        setRinged([]);
    }, [date.getMinutes()]);

    useEffect(() => {
        // alarm checker
        alarms.map((alarm) => {
            if (isAlarmTime(date, alarm)) {
                triggerAlarm(alarm);
                ringed.push(alarm);
                setRinged(ringed);
            }
        });
    }, [date]);

    const isAlarmTime = (date, alarm) => {
        const { time, interval, isOn } = alarm;
        return (
            isOn &&
            interval.days[date.getDay()] &&
            interval.days[date.getDay()] &&
            time.hour == date.getHours() &&
            time.minute == date.getMinutes() &&
            !ringed.find((ringedAlarm) => ringedAlarm.id === alarm.id)
        );
    };
    const triggerAlarm = (alarm) => {
        const { time, description } = alarm;
        const message = (
            <div>
                <p className="fs-4 fw-bold">叮！闹钟响了！</p>
                <p className="fs-5 mb-1 fw-bold">{`${time.hour}:${time.minute}`}</p>
                <p className="fs-6 mb-0">{description}</p>
            </div>
        );
        toast(message, {
            position: "bottom-right",
            theme: "dark",
        });
    };
    const addAlarm = async (alarm) => {
        const { data: newAlarms } = await addAlarmApi(alarm);
        setAlarms(newAlarms);
    };
    const changeAlarm = async (newAlarm) => {
        const { data: newAlarms } = await updateAlarmApi(newAlarm.id, newAlarm);
        setAlarms(newAlarms);
    };
    const deleteAlarm = async (id) => {
        const { data: newAlarms } = await deleteAlarmApi(id);
        setAlarms(newAlarms);
    };
    return (
        <>
            <ToastContainer />
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
                <AlarmContext.Provider
                    value={{
                        alarms,
                        triggerAlarm,
                        addAlarm,
                        changeAlarm,
                        deleteAlarm,
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
                </AlarmContext.Provider>
            </TimeContext.Provider>
        </>
    );
}

export default App;

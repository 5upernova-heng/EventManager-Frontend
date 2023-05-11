import React from "react";
import { useState, useEffect, useContext, createContext } from "react";
import {
    getAlarmApi,
    updateAlarmApi,
    deleteAlarmApi,
    addAlarmApi,
} from "../api/alarmApi";
import { toast } from "react-toastify";
import { TimeContext } from "./TimeContextProvider";

export const AlarmContext = createContext();
export default function AlarmContextProvider({ children }) {
    const { date } = useContext(TimeContext);
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
        const { hour, minute } = time;
        const message = (
            <div>
                <p className="fs-4 fw-bold">叮！闹钟响了！</p>
                <p className="fs-5 mb-1 fw-bold">{`${getTimeString(
                    hour,
                    minute
                )}`}</p>
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
        <AlarmContext.Provider
            value={{
                alarms,
                triggerAlarm,
                addAlarm,
                changeAlarm,
                deleteAlarm,
            }}
        >
            {children}
        </AlarmContext.Provider>
    );
}

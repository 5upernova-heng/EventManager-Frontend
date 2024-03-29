import React, { createContext, useState, useEffect } from "react";

export const TimeContext = createContext();
export default function TimeContextProvider({ children }) {
    const [date, setDate] = useState(new Date());
    const [viewDate, setViewDate] = useState(date);
    // pause or not
    const [tick, setTick] = useState(true);
    // sync with real time or not
    const [sync, setSync] = useState(false);
    const [timeInterval, setTimeInterval] = useState(60 * 5);

    useEffect(() => {
        date.setSeconds(0);
        const minute = date.getMinutes();
        date.setMinutes(minute - (minute % 5));
        setDate(date);
    }, []);

    useEffect(() => {
        if (tick || sync) {
            if (sync) {
                setTick(true);
                setTimeInterval(1);
            }
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
    const changeInterval = (interval) => {
        if (interval > 60) {
            date.setSeconds(0);
            date.setMinutes(date.getMinutes() - (date.getMinutes() % 5));
        }
        if (interval > 60 * 60) date.setMinutes(0);
        setDate(date);
        setTimeInterval(interval);
    };
    return (
        <TimeContext.Provider
            value={{
                tick,
                toggleTick,
                date,
                setDate,
                sync,
                toggleSync,
                timeInterval,
                setTimeInterval: changeInterval,
                // viewDate
                viewDate,
                setViewDate,
            }}
        >
            {children}
        </TimeContext.Provider>
    );
}

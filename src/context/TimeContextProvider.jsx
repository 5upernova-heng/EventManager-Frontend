import React, { createContext, useState, useEffect } from "react";

export const TimeContext = createContext();
export default function TimeContextProvider({ children }) {
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
                setTimeInterval,
            }}
        >
            {children}
        </TimeContext.Provider>
    );
}

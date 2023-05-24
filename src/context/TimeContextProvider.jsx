import React, { createContext, useState, useEffect } from "react";

export const TimeContext = createContext();
export default function TimeContextProvider({ children }) {
    const [date, setDate] = useState(new Date());
    // pause or not
    const [tick, setTick] = useState(true);
    // sync with real time or not
    const [sync, setSync] = useState(false);
    const [timeInterval, setTimeInterval] = useState(60 * 5);

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

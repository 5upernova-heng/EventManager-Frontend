import { useContext } from "react";
import { TimeContext } from "../context/TimeContextProvider";
import { getDateString, getTimeString, getDayString } from "../utils/calDate";
const Time = () => {
    const { date, toggleTick, tick, sync, timeInterval } =
        useContext(TimeContext);
    const renderClassName = () => {
        if (!tick) return "btn btn-outline-secondary";
        if (sync) return "btn btn-primary";
        else return "btn btn-success";
    };
    const dateStr = getDateString(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );
    const timeStr = getTimeString(
        date.getHours(),
        date.getMinutes(),
        timeInterval == 1 ? date.getSeconds() : 0
    );
    const dayStr = getDayString(date.getDay());
    const textStr = `${dateStr} ${timeStr} ${dayStr}`;
    console.log(timeInterval);
    return (
        <button className={renderClassName()} onClick={toggleTick}>
            <p className="fs-6 fw-bold mb-0 text-center">{textStr}</p>
        </button>
    );
};

export default Time;

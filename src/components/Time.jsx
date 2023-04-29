import { useContext } from "react";
import { TimeContext } from "../App";
import { getDateString, getTimeString, getDayString } from "../utils/calDate";
const Time = () => {
    const { date, toggleTick, tick, sync } = useContext(TimeContext);
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
        date.getSeconds()
    );
    const dayStr = getDayString(date.getDay());
    const textStr = `${dateStr} ${timeStr} ${dayStr}`;

    return (
        <button className={renderClassName()} onClick={toggleTick}>
            <p className="fs-6 fw-bold mb-0 text-center">{textStr}</p>
        </button>
    );
};

export default Time;

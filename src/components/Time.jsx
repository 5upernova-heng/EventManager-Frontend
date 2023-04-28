import { useContext } from "react";
import { TimeContext } from "../App";
const Time = () => {
    const { date, toggleTick, tick, sync } = useContext(TimeContext);
    const getDateString = () => {
        return `
    ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
    ${String(date.getHours()).padStart(2, "0")}:${String(
            date.getMinutes()
        ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
    };
    const renderClassName = () => {
        if (!tick) return "btn btn-outline-secondary";
        if (sync) return "btn btn-primary";
        else return "btn btn-success";
    };
    return (
        <button className={renderClassName()} onClick={toggleTick}>
            <p className="fs-6 fw-bold mb-0 text-center">
                {getDateString(date)}
            </p>
        </button>
    );
};

export default Time;

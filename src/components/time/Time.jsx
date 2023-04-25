import TimeString from "./TimeString";
import TimeButton from "./TimeButton";

function getDateString(date) {
    return `
    ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
    ${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
}
const Time = ({ date, clickHandler, tick, sync }) => {
    return (
        <div className="d-flex align-items-center">
            <TimeString date={date} />
            <TimeButton clickHandler={clickHandler} tick={tick} sync={sync} />
        </div>
    );
};

export default Time;

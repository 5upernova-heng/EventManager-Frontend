import TimeString from "./TimeString";
import TimeButton from "./TimeButton";

const Time = ({ date, clickHandler, tick, sync }) => {
    return (
        <div className="d-flex align-items-center">
            <TimeString date={date} />
            <TimeButton clickHandler={clickHandler} tick={tick} sync={sync} />
        </div>
    );
};

export default Time;

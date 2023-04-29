import { getDayString, getTimeString } from "../utils/calDate";
import "../styles/switch.css";

const Alarm = ({ time, description, interval, isOn, toggleHandler, id }) => {
    const intervalLabel = ["单次", "每天", "每周"];
    const timeStr = getTimeString(time.hour, time.minute);
    return (
        <div
            className={`d-flex border rounded-pill p-2 my-3 ${
                isOn ? "" : "opacity-50"
            }`}
            style={{ minWidth: "600px" }}
        >
            <div className="d-flex align-items-end">
                <p className="fs-2 fw-bold mb-0 ms-3 me-2">{timeStr}</p>
                <p className="fs-5 mb-0 me-2 text-secondary">
                    {interval.type
                        ? intervalLabel[interval.type]
                        : getDayString(interval.day)}
                </p>
            </div>
            <div className=" d-flex flex-grow-1 justify-content-center align-items-center">
                <p className="fs-5 mb-0 mx-2 text-secondary">{description}</p>
            </div>
            <div className="d-flex justify-content-end align-items-center">
                <div className="mb-1 me-3 form-check form-switch form-switch-lg">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`Alarm${id}`}
                        checked={isOn}
                        onChange={toggleHandler}
                    />
                </div>
            </div>
        </div>
    );
};

export default Alarm;

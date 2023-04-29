import { getDayString, getTimeString } from "../utils/calDate";
import Switch from "./Switch";

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
                <div className="me-3 mb-1">
                    <Switch
                        id={`Alarm${id}`}
                        isOn={isOn}
                        toggleHandler={toggleHandler}
                        size={"lg"}
                    />
                </div>
            </div>
        </div>
    );
};

export default Alarm;

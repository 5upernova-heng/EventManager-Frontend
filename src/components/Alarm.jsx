import { useState } from "react";
import { getDaysString, getTimeString } from "../utils/calDate";
import Switch from "./forms/Switch";
import AlarmFormGroup from "./forms/AlarmFormGroup";

const Alarm = ({ alarm, triggerAlarm, changeAlarm, deleteAlarm }) => {
    const { time, description, interval, isOn, id } = alarm;
    const timeStr = getTimeString(time.hour, time.minute);
    const [collapse, setCollapse] = useState(true);
    return (
        <div
            className={`d-flex flex-column border rounded-5 p-2 my-2 ${
                isOn ? "" : "opacity-50"
            }`}
            style={{ minWidth: "600px" }}
        >
            <div className="d-flex px-3">
                <div
                    className="d-flex flex-grow-1"
                    onClick={() => {
                        setCollapse(!collapse);
                    }}
                >
                    <div className="d-flex align-items-end">
                        <p className="fs-2 fw-bold mb-0 me-2">{timeStr}</p>
                        <p className="fs-5 mb-0 me-2 text-secondary">
                            {getDaysString(interval.days)}
                        </p>
                    </div>
                    <div className=" d-flex flex-grow-1 justify-content-end align-items-center">
                        <p className="fs-5 mb-0 mx-2 text-secondary">
                            {description}
                        </p>
                    </div>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                    <div className="mb-1">
                        <Switch
                            id={`Alarm${id}`}
                            isOn={isOn}
                            toggleHandler={(event) => {
                                alarm.isOn = event.target.checked;
                                changeAlarm(alarm);
                            }}
                            size={"lg"}
                        />
                    </div>
                </div>
            </div>
            <div className="px-3" hidden={collapse}>
                <AlarmFormGroup
                    alarm={alarm}
                    triggerAlarm={triggerAlarm}
                    changeAlarm={changeAlarm}
                    deleteAlarm={deleteAlarm}
                />
            </div>
        </div>
    );
};

export default Alarm;

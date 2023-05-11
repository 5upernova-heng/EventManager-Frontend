import Range from "./Range";
import CheckButtonGroup from "./CheckButtonGroup";
import Input from "./Input";
import { useContext, useState } from "react";
import { AlarmContext } from "../../Context";
const AlarmFormGroup = ({ alarm }) => {
    const { time, description, interval, id } = alarm;
    const [hour, setHour] = useState(alarm.time.hour);
    const [minute, setMinute] = useState(alarm.time.minute);
    const { triggerAlarm, changeAlarm, deleteAlarm } = useContext(AlarmContext);
    const hourHandler = (event) => {
        setHour(event.target.value);
    };
    const minuteHandler = (event) => {
        setMinute(event.target.value);
    };
    const changeInterval = (interval) => {
        const newAlarm = structuredClone(alarm);
        newAlarm.interval = interval;
        changeAlarm(newAlarm);
    };
    const changeDescription = (event) => {
        const newAlarm = structuredClone(alarm);
        newAlarm.description = event.target.value;
        changeAlarm(newAlarm);
    };
    const saveChanges = () => {
        const newAlarm = structuredClone(alarm);
        newAlarm.time.hour = hour;
        newAlarm.time.minute = minute;
        changeAlarm(newAlarm);
    };
    return (
        <div className="d-flex justify-content-between">
            <div className="d-flex flex-column justify-content-between">
                <Range
                    id={`hour-${id}`}
                    label={`小时: ${hour}`}
                    value={time.hour}
                    changeHandler={hourHandler}
                    rangeAttrs={{ min: 0, max: 23, step: 1 }}
                />
                <Range
                    id={`minute-${id}`}
                    label={`分钟: ${minute}`}
                    value={time.minute}
                    changeHandler={minuteHandler}
                    rangeAttrs={{ min: 0, max: 59, step: 1 }}
                />
            </div>
            <div className="d-flex flex-column justify-content-between">
                <div className="d-flex flex-column mb-2">
                    <p className="mb-0 fw-bold">周期</p>
                    <CheckButtonGroup
                        interval={interval}
                        changeInterval={changeInterval}
                    />
                </div>
                <div className="d-flex flex-column justify-content-between mb-2">
                    <Input
                        name={`input-${id}`}
                        label={`描述`}
                        value={description}
                        onChange={changeDescription}
                    />
                </div>
            </div>
            <div className="d-flex align-items-end justify-content-end pb-2">
                <button
                    className="btn btn-success mx-1"
                    onClick={() => triggerAlarm(alarm)}
                >
                    预览
                </button>
                <button className="btn btn-primary mx-1" onClick={saveChanges}>
                    保存
                </button>
                <button
                    className="btn btn-danger mx-1"
                    onClick={() => deleteAlarm(alarm.id)}
                >
                    删除闹钟
                </button>
            </div>
        </div>
    );
};

export default AlarmFormGroup;

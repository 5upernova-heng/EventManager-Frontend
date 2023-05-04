import Range from "./Range";
import CheckButtonGroup from "./CheckButtonGroup";
import Input from "./Input";
const AlarmFormGroup = ({ alarm, changeAlarm, deleteAlarm }) => {
    const { time, description, interval, id } = alarm;
    const hourHandler = (event) => {
        alarm.time.hour = event.target.value;
        changeAlarm(alarm);
    };
    const minuteHandler = (event) => {
        alarm.time.minute = event.target.value;
        changeAlarm(alarm);
    };
    const changeInterval = (interval) => {
        alarm.interval = interval;
        changeAlarm(alarm);
    };
    const changeDescription = (event) => {
        alarm.description = event.target.value;
        changeAlarm(alarm);
    };
    return (
        <div className="d-flex justify-content-between">
            <div className="d-flex flex-column justify-content-between">
                <Range
                    id={`hour${id}`}
                    label={"小时"}
                    value={time.hour}
                    changeHandler={hourHandler}
                    rangeAttrs={{ min: 0, max: 23, step: 1 }}
                />
                <Range
                    id={`minute${id}`}
                    label={"分钟"}
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
                        name={`input${id}`}
                        label={`描述`}
                        value={description}
                        onChange={changeDescription}
                    />
                </div>
            </div>
            <div className="d-flex flex-column justify-content-end pb-2">
                <button className="btn btn-primary my-1">保存至云端</button>
                <button className="btn btn-danger my-1" onClick={deleteAlarm}>
                    删除闹钟
                </button>
            </div>
        </div>
    );
};

export default AlarmFormGroup;

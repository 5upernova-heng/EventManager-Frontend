import { useContext } from "react";
import Alarm from "../components/Alarm";
import { AlarmContext } from "../App";

const Alarms = () => {
    const { alarms, addAlarm, triggerAlarm } = useContext(AlarmContext);
    const addAlarmHandler = () => {
        if (alarms.length !== 0) {
            const alarm = structuredClone(alarms[alarms.length - 1]);
            alarm.id += 1;
            addAlarm(alarm);
        } else {
            const alarm = {
                time: { hour: 0, minute: 0 },
                description: "",
                interval: {
                    days: [false, false, false, false, false, false, false],
                },
                isOn: false,
                id: 1,
            };
            addAlarm(alarm);
        }
    };
    const renderAlarms = () => {
        return alarms.length !== 0 ? (
            alarms.map((alarm, index) => {
                return (
                    <Alarm
                        key={index}
                        alarm={alarm}
                        triggerAlarm={triggerAlarm}
                    />
                );
            })
        ) : (
            <p className="text-center fs-3">暂无闹钟</p>
        );
    };
    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="d-flex flex-column col mx-5 mt-3">
                <div className="d-flex justify-content-end me-2 my-2">
                    <button
                        className="btn btn-success"
                        onClick={addAlarmHandler}
                    >
                        添加闹钟 +
                    </button>
                </div>
                {renderAlarms()}
            </div>
            <div className="col-2"></div>
        </div>
    );
};

export default Alarms;

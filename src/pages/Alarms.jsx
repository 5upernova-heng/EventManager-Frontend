import { useState } from "react";
import Alarm from "../components/Alarm";

const Alarms = () => {
    const [alarms, setAlarms] = useState([
        {
            time: { hour: 7, minute: 40 },
            description: "这是一段闹钟描述，这个闹钟是一个周期性闹钟。",
            interval: {
                days: [true, true, true, true, true, true, true],
            },
            isOn: true,
            alarmOnce: true,
            id: 0,
        },
        {
            time: { hour: 20, minute: 15 },
            description: "这是一段闹钟描述，这是一个单次闹钟。",
            interval: {
                days: [false, true, false, false, false, false, false],
            },
            isOn: true,
            id: 1,
        },
        {
            time: { hour: 14, minute: 10 },
            description: "这是一段闹钟描述，这是一个每周闹钟。",
            interval: {
                days: [false, true, false, false, false, false, true],
            },
            isOn: true,
            id: 1,
        },
    ]);
    const changeAlarm = (index, alarm) => {
        let newAlarms = [...alarms];
        newAlarms[index] = alarm;
        setAlarms(newAlarms);
    };
    const deleteAlarm = (index) => {
        alarms.splice(index, 1);
        setAlarms(alarms);
    };
    const renderAlarms = () => {
        return alarms.length !== 0 ? (
            alarms.map((alarm, index) => {
                return (
                    <Alarm
                        key={index}
                        alarm={alarm}
                        changeAlarm={(alarm) => changeAlarm(index, alarm)}
                        deleteAlarm={() => deleteAlarm(index)}
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
                    <button className="btn btn-success">添加闹钟 +</button>
                </div>
                {renderAlarms()}
            </div>
            <div className="col-2"></div>
        </div>
    );
};

export default Alarms;

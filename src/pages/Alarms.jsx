import { useState } from "react";
import Alarm from "../components/Alarm";

const Alarms = () => {
    const [alarms, setAlarms] = useState([
        {
            time: { hour: 7, minute: 40 },
            description: "这是一段闹钟描述，这个闹钟是一个周期性闹钟。",
            interval: {
                type: 1,
            },
            isOn: true,
            id: 0,
        },
        {
            time: { hour: 20, minute: 15 },
            description: "这是一段闹钟描述，这是一个单次闹钟。",
            interval: {
                type: 0,
                day: 1,
            },
            isOn: true,
            id: 1,
        },
        {
            time: { hour: 14, minute: 10 },
            description: "这是一段闹钟描述，这是一个每周闹钟。",
            interval: {
                type: 0,
                day: 6,
            },
            isOn: true,
            id: 1,
        },
    ]);
    const handleCheck = (event, index) => {
        let newAlarms = [...alarms];
        newAlarms[index].isOn = event.target.checked;
        setAlarms(newAlarms);
    };
    const renderAlarms = () => {
        return alarms.map((alarm, index) => {
            alarm.toggleHandler = (event) => {
                handleCheck(event, index);
            };
            return <Alarm key={index} {...alarm} />;
        });
    };
    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col m-5">{renderAlarms()}</div>
            <div className="col-2"></div>
        </div>
    );
};

export default Alarms;

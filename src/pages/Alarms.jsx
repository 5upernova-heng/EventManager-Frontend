import { useEffect, useState } from "react";
import Alarm from "../components/Alarm";
import { getAlarms, updateAlarms, deleteAlarms } from "../api/alarm";

const Alarms = () => {
    const [alarms, setAlarms] = useState([]);

    useEffect(() => {
        const fetchAlarms = async () => {
            const { data } = await getAlarms();
            setAlarms(data);
        };
        fetchAlarms();
    }, []);

    const changeAlarm = (index, alarm) => {
        let newAlarms = [...alarms];
        newAlarms[index] = alarm;
        updateAlarms(alarm.id, alarm);
        setAlarms(newAlarms);
    };
    const deleteAlarm = (index) => {
        const id = alarms[index].id;
        deleteAlarms(id);
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

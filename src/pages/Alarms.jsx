import { useContext, useEffect, useState } from "react";
import Alarm from "../components/Alarm";
import { AlarmContext } from "../App";

const Alarms = () => {
    const { alarms, triggerAlarm, changeAlarm, deleteAlarm } =
        useContext(AlarmContext);
    const renderAlarms = () => {
        return alarms.length !== 0 ? (
            alarms.map((alarm, index) => {
                return (
                    <Alarm
                        key={index}
                        alarm={alarm}
                        triggerAlarm={triggerAlarm}
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

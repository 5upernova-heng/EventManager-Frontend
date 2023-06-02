import React, { useContext } from "react";
import { MapContext } from "../../context/MapContextProvider";
import Switch from "../forms/Switch";

export default function AllowRide() {
    const { ride, setRide } = useContext(MapContext);
    const toggleRide = () => {
        setRide(!ride);
    };
    return (
        <div className="col d-flex justify-content-between align-items-center my-2">
            <label htmlFor="syncRealTime" className="flex-grow-1">
                允许使用自行车
            </label>
            <Switch
                id="syncRealTime"
                isOn={ride}
                toggleHandler={toggleRide}
                size={"md"}
            />
        </div>
    );
}

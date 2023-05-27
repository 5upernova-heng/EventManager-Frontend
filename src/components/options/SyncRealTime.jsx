import { TimeContext } from "../../context/TimeContextProvider";
import { useContext } from "react";
import Switch from "../forms/Switch";

const SyncRealTime = () => {
    const { sync, toggleSync } = useContext(TimeContext);
    return (
        <div className="col d-flex justify-content-between align-items-center my-2">
            <label htmlFor="syncRealTime">与自然时间同步</label>
            <Switch
                id="syncRealTime"
                isOn={sync}
                toggleHandler={toggleSync}
                size={"md"}
            />
        </div>
    );
};

export default SyncRealTime;

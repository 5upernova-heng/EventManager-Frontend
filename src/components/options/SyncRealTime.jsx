import { TimeContext } from "../../App";
import { useContext } from "react";

const SyncRealTime = () => {
    const { sync, toggleSync } = useContext(TimeContext);
    return (
        <div className="col d-flex justify-content-between align-items-center my-2">
            <label htmlFor="syncRealTime">与自然时间同步</label>
            <input
                type="checkbox"
                id="syncRealTime"
                checked={sync}
                onChange={toggleSync}
            />
        </div>
    );
};

export default SyncRealTime;

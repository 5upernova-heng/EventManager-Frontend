import { TimeContext } from "../../context/TimeContextProvider";
import { useContext } from "react";

const ChooseInterval = () => {
    const { timeInterval, setTimeInterval } = useContext(TimeContext);
    const intervalList = [1, 60 * 5, 60 * 60, 60 * 60 * 24, 60 * 60 * 24 * 7];
    return (
        <div className="col d-flex justify-content-between align-item-center my-3">
            <label className="text-center mb-0">时间跨度</label>
            <select
                className="form-select-sm"
                aria-label="Default select example"
                defaultValue="1"
                value={intervalList.indexOf(timeInterval)}
                onChange={(e) => {
                    setTimeInterval(
                        intervalList[parseInt(e.currentTarget.value)]
                    );
                }}
            >
                <option value="0">1 秒/秒</option>
                <option value="1">5 分钟/秒</option>
                <option value="2">1 小时/秒</option>
                <option value="3">1 天/秒</option>
                <option value="4">1 周/秒</option>
            </select>
        </div>
    );
};

export default ChooseInterval;

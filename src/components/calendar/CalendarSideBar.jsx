import MonthCalendar from "./monthcalendar/MonthCalendar";

const CalendarSideBar = () => {
    return (
        <>
            <MonthCalendar date={new Date()} />
            <hr className="my-2"></hr>
            <div className="d-flex flex-column justify-content-center">
                <span className="badge text-bg-secondary my-2">
                    <h4 className="m-0 p-1">时间设置</h4>
                </span>
                <div className="row d-flex flex-column justify-content-between align-items-center">
                    <div className="col d-flex justify-content-between align-items-center my-2">
                        <label for="syncRealTime">与自然时间同步</label>
                        <input type="checkbox" id="syncRealTime" />
                    </div>
                    <div className="col d-flex justify-content-between align-item-center my-3">
                        <label className="text-center mb-0">时间跨度</label>
                        <select
                            className="form-select-sm"
                            aria-label="Default select example"
                        >
                            <option selected>1 秒/秒</option>
                            <option value="1">1 分钟/秒</option>
                            <option value="2">1 小时/秒</option>
                            <option value="3">1 天/秒</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CalendarSideBar;

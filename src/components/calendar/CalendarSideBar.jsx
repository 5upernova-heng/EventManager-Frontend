import MonthCalendar from "./MonthCalendar";
import SyncRealTime from "../options/SyncRealTime";
import ChooseInterval from "../options/ChooseInterval";
import ChooseStart from "../options/ChooseStart";

const CalendarSideBar = () => {
    return (
        <>
            <MonthCalendar />
            <hr className="my-2"></hr>
            <div className="d-flex flex-column justify-content-center">
                <h4 className="m-0 p-1 text-center fw-bold">时间设置</h4>
                <div className="row d-flex flex-column justify-content-between align-items-center">
                    <SyncRealTime />
                    <ChooseInterval />
                </div>
                <h4 className="m-0 p-1 text-center fw-bold">地点设置</h4>
                <div className="row d-flex flex-column justify-content-between align-items-center">
                    <ChooseStart />
                </div>
            </div>
        </>
    );
};

export default CalendarSideBar;

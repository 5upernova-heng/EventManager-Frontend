import { useContext } from "react";
import CalendarBar from "../components/calendar/CalendarBar";
import CalendarSideBar from "../components/calendar/CalendarSideBar";
import ModelGroup from "../components/ModalGroup";
import { EventContext } from "../context/EventContextProvider";
import WeekCalendar from "../components/calendar/WeekCalendar";
import TempEvents from "../components/calendar/TempEvents";
import SearchResult from "../components/calendar/SearchResult";
import ReminderBar from "../components/reminder/ReminderBar";

function Calendar() {
    const { view } = useContext(EventContext);
    const views = [<WeekCalendar />, <TempEvents />, <SearchResult />];
    const renderView = () => {
        return views[view];
    };
    return (
        <>
            <ModelGroup />
            <CalendarBar />
            <div className="row mx-0 pe-0">
                <div className="col-2">
                    <CalendarSideBar />
                </div>
                <div className="col ms-0">{renderView()}</div>
                <div className="col-2 px-0">
                    <ReminderBar />
                </div>
            </div>
        </>
    );
}

export default Calendar;

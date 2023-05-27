import { useContext } from "react";
import CalendarBar from "../components/calendar/CalendarBar";
import CalendarSideBar from "../components/calendar/CalendarSideBar";
import ModelGroup from "../components/ModalGroup";
import { EventContext } from "../context/EventContextProvider";
import WeekCalendar from "../components/calendar/WeekCalendar";
import TempEvents from "../components/calendar/TempEvents";
import SearchResult from "../components/calendar/SearchResult";

function Calendar() {
    const { view } = useContext(EventContext);
    const views = [<WeekCalendar />, <TempEvents />, <SearchResult />];
    const renderView = () => {
        return views[view];
    };
    return (
        <>
            <CalendarBar />
            <div className="row mx-0 pe-0">
                <div className="col-2">
                    <CalendarSideBar />
                </div>
                <div className="col ms-0 me-4">{renderView()}</div>
                <ModelGroup />
            </div>
        </>
    );
}

export default Calendar;

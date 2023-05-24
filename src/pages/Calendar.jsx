import CalendarBar from "../components/calendar/CalendarBar";
import WeekCalendar from "../components/calendar/WeekCalendar";
import CalendarSideBar from "../components/calendar/CalendarSideBar";
import EventContextProvider from "../context/EventContextProvider";

function Calendar() {
    return (
        <>
            <CalendarBar />
            <div className="row container-fluid mx-0 pe-0">
                <div className="col-2">
                    <CalendarSideBar />
                </div>
                <div className="col ms-0 me-4">
                    <EventContextProvider>
                        <WeekCalendar />
                    </EventContextProvider>
                </div>
            </div>
        </>
    );
}

export default Calendar;

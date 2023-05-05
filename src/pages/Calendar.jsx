import CalendarBar from "../components/calendar/CalendarBar";
import WeekCalendar from "../components/calendar/WeekCalendar";
import CalendarSideBar from "../components/calendar/CalendarSideBar";
import { useState, useEffect } from "react";
import { getEventsApi } from "../api/eventApi";

function Calendar() {
    const [distEvents, setDistEvents] = useState([[], [], [], [], [], [], []]);
    useEffect(() => {
        // mount:
        // 1. distribute events
        // 2. setTimeInterval
        const getEvents = async () => {
            const { data: events } = await getEventsApi();
            const newDistrube = [[], [], [], [], [], [], []];
            events.map((event) => {
                newDistrube[event.day].push(event);
            });
            setDistEvents(newDistrube);
        };
        getEvents();
    }, []);

    return (
        <>
            <CalendarBar />
            <div className="row container-fluid mx-0 pe-0">
                <div className="col-2">
                    <CalendarSideBar />
                </div>
                <div className="col ms-0 me-4">
                    <WeekCalendar events={distEvents} />
                </div>
            </div>
        </>
    );
}

export default Calendar;

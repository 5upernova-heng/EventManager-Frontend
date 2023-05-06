import CalendarBar from "../components/calendar/CalendarBar";
import WeekCalendar from "../components/calendar/WeekCalendar";
import CalendarSideBar from "../components/calendar/CalendarSideBar";
import { useState, useEffect } from "react";
import { getEventsApi } from "../api/eventApi";

function Calendar() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        // mount:
        // 1. distribute events
        // 2. setTimeInterval
        const getEvents = async () => {
            const { data: events } = await getEventsApi();
            setEvents(events);
        };
        getEvents();
    }, []);

    const distrube = () => {
        const distrubed = [[], [], [], [], [], [], []];
        events.map((event) => {
            const date = new Date(event.startTime);
            const day = date.getDay();
            distrubed[day].push(event);
        });
        return distrubed;
    };

    return (
        <>
            <CalendarBar />
            <div className="row container-fluid mx-0 pe-0">
                <div className="col-2">
                    <CalendarSideBar />
                </div>
                <div className="col ms-0 me-4">
                    <WeekCalendar events={distrube()} />
                </div>
            </div>
        </>
    );
}

export default Calendar;

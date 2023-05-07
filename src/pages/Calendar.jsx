import CalendarBar from "../components/calendar/CalendarBar";
import WeekCalendar from "../components/calendar/WeekCalendar";
import CalendarSideBar from "../components/calendar/CalendarSideBar";
import { TimeContext } from "../App";

import {
    addEventApi,
    deleteEventApi,
    getEventsApi,
    updateEventApi,
} from "../api/eventApi";

import { useState, useEffect, createContext, useContext } from "react";

export const EventContext = createContext();

function Calendar() {
    const { date } = useContext(TimeContext);
    const emptyEvent = {
        title: "",
        startTime: 0,
        endTime: 0,
        description: "",
        category: 0,
        isOnce: 0,
        isOfficial: 0,
    };

    const [events, setEvents] = useState([]);
    const [choosedEvent, setChoosedEvent] = useState(emptyEvent);

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

    const addEvent = async (event) => {
        const { data: newEvents } = await addEventApi(event);
        setEvents(newEvents);
    };

    const updateEvent = async (newEvent) => {
        const { data: newEvents } = await updateEventApi(newEvent.id, newEvent);
        setEvents(newEvents);
    };

    const deleteEvent = async (id) => {
        const { data: newEvents } = await deleteEventApi(id);
        setEvents(newEvents);
    };

    const setCellEvent = (row, col) => {
        const startTime = new Date(date);
        startTime.setDate(date.getDate() - date.getDay() + row);
        startTime.setHours(col);
        const endTime = new Date(startTime);
        endTime.setHours(col + 1);
        setChoosedEvent({
            title: "",
            startTime: startTime.getTime(),
            endTime: endTime.getTime(),
            description: "",
            category: 0,
            isOnce: 0,
            isOfficial: 0,
        });
    };

    const setEventEvent = (event) => {
        setChoosedEvent(event);
    };

    return (
        <>
            <CalendarBar />
            <div className="row container-fluid mx-0 pe-0">
                <div className="col-2">
                    <CalendarSideBar />
                </div>
                <div className="col ms-0 me-4">
                    <EventContext.Provider
                        value={{
                            events,
                            addEvent,
                            updateEvent,
                            deleteEvent,
                            choosedEvent,
                            setCellEvent,
                            setEventEvent,
                        }}
                    >
                        <WeekCalendar events={distrube()} />
                    </EventContext.Provider>
                </div>
            </div>
        </>
    );
}

export default Calendar;

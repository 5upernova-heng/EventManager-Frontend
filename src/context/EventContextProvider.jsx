import React, { useState, useContext, createContext, useEffect } from "react";
import {
    getEventsApi,
    addEventApi,
    deleteEventApi,
    updateEventApi,
} from "../api/eventApi";
import { TimeContext } from "./TimeContextProvider";

export const EventContext = createContext();

export default function EventContextProvider({ children }) {
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
    /** All events in an array */
    const [events, setEvents] = useState([]);
    /** ChoosedEvent to change(If have) */
    const [choosedEvent, setChoosedEvent] = useState(emptyEvent);
    const officialColorSet = ["primary", "danger"];
    const personalColorSet = ["success", "info", "secondary"];

    /** mount data */
    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        const { data } = await getEventsApi();
        setEvents(data);
    };

    /**  Distrube events to a 2D array*/
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

    const getEventColor = (event) => {
        const { isOfficial, category } = event;
        return isOfficial
            ? officialColorSet[category]
            : personalColorSet[category];
    };

    return (
        <EventContext.Provider
            value={{
                // events manipulation
                events,
                addEvent,
                updateEvent,
                deleteEvent,
                choosedEvent,
                setCellEvent,
                setEventEvent,
                distrube,
                // event style
                officialColorSet,
                personalColorSet,
                getEventColor,
            }}
        >
            {children}
        </EventContext.Provider>
    );
}

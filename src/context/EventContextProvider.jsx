import React, { useState, useContext, createContext, useEffect } from "react";
import {
    getEventsApi,
    addEventApi,
    deleteEventApi,
    updateEventApi,
} from "../api/eventApi";
import { TimeContext } from "./TimeContextProvider";
import { minutesToStamp, stampTo5Minutes } from "../utils/calDate";

export const EventContext = createContext();

export default function EventContextProvider({ children }) {
    const { date } = useContext(TimeContext);
    const emptyEvent = {
        title: "",
        startTime: 0,
        endTime: 0,
        location: 0,
        category: 0,
        isOnce: 0,
        isOfficial: 0,
    };
    /** All events in an array */
    const [events, setEvents] = useState([]);
    /**ChoosedEvent to change(If have)
     * Use choosedEvent, we can fill some form before user to fill
     */
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
        console.log(newEvents);
        setEvents(newEvents);
        console.log(events);
    };

    const deleteEvent = async (id) => {
        const { data: newEvents } = await deleteEventApi(id);
        setEvents(newEvents);
    };

    /** Called when clicking the cell */
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
            location: 0,
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

    /**Temp event that wait for submit
     * It will update when choosedEvent changes.
     * (Modal make sure that it will not change when user is modifying an event)
     */
    const eventToData = (event) => {
        const {
            title,
            location,
            category,
            isOnce,
            isOfficial,
            startTime,
            endTime,
        } = event;
        const startDate = new Date(startTime);
        return {
            title,
            location,
            category,
            isOnce,
            isOfficial,
            // time
            startTime,
            month: startDate.getMonth(),
            date: startDate.getDate(),
            day: startDate.getDay(),
            startMinute: stampTo5Minutes(startTime),
            endMinute: stampTo5Minutes(endTime),
        };
    };

    const dataToEvent = (data) => {
        const {
            title,
            location,
            category,
            isOnce,
            isOfficial,
            month,
            date,
            day,
            startMinute,
            endMinute,
        } = data;
        const startDate = new Date(minutesToStamp(startMinute));
        const endDate = new Date(minutesToStamp(endMinute));
        startDate.setMonth(month);
        startDate.setDate(date);
        if (!isOnce) startDate.setDate(date - startDate.getDay() + day);
        endDate.setMonth(month);
        endDate.setDate(startDate.getDate());
        return {
            title,
            location,
            category,
            isOnce,
            isOfficial,
            startTime: startDate.getTime(),
            endTime: endDate.getTime(),
        };
    };

    const emptyData = eventToData(emptyEvent);
    const [submitData, setSubmit] = useState(emptyData);
    useEffect(() => {
        setSubmit(eventToData(choosedEvent));
    }, [choosedEvent]);

    const changeData = (dataObject) => {
        const newData = structuredClone(submitData);
        for (const prop in dataObject) {
            newData[prop] = dataObject[prop];
        }
        setSubmit(newData);
    };

    return (
        <EventContext.Provider
            value={{
                // data
                events,
                submitData,
                choosedEvent,
                // events manipulation
                addEvent,
                updateEvent,
                deleteEvent,
                setCellEvent,
                setEventEvent,
                changeData,
                distrube,
                // event data conversion
                dataToEvent,
                eventToData,
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

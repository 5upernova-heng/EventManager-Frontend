import React, { useState, useContext, createContext, useEffect } from "react";
import {
    getEventsApi,
    addEventApi,
    deleteEventApi,
    updateEventApi,
    searchEventsApi,
} from "../api/eventApi";
import { TimeContext } from "./TimeContextProvider";
import { minutesToStamp, stampTo5Minutes } from "../utils/calDate";
import { LoginContext } from "./LoginContextProvider";

export const EventContext = createContext();

export default function EventContextProvider({ children }) {
    const { date } = useContext(TimeContext);
    const { loginAccount } = useContext(LoginContext);
    const emptyEvent = {
        title: "",
        startTime: 0,
        endTime: 0,
        location: -1,
        category: 0,
        doLoop: 0,
        doRemind: false,
        owner: loginAccount.username,
        participants: [],
    };
    /** All events in an array */
    const [events, setEvents] = useState([]);
    /**ChoosedEvent to change(If have)
     * Use choosedEvent, we can fill some form before user to fill
     */
    const [choosedEvent, setChoosedEvent] = useState(emptyEvent);

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
        const normalEvents = [[], [], [], [], [], [], []];
        const tempEvents = [];
        events.map((event) => {
            const date = new Date(event.startTime);
            if (event.category != 4) {
                if (event.doLoop == 1) {
                    for (let day = 0; day < 7; day++)
                        normalEvents[day].push(event);
                } else {
                    const day = date.getDay();
                    normalEvents[day].push(event);
                }
            } else {
                tempEvents.push(event);
            }
        });
        return { normalEvents, tempEvents };
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

    /** Called when clicking the cell */
    const setCellEvent = (row, col) => {
        const startTime = new Date(date);
        startTime.setDate(date.getDate() - date.getDay() + row);
        startTime.setHours(col);
        const endTime = new Date(startTime);
        endTime.setHours(col + 1);
        emptyEvent.startTime = startTime.getTime();
        emptyEvent.endTime = endTime.getTime();
        setChoosedEvent(emptyEvent);
    };

    const setEventEvent = (event) => {
        setChoosedEvent(event);
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
            doLoop,
            startTime,
            endTime,
            doRemind,
            owner,
            participants,
        } = event;
        const startDate = new Date(startTime);
        return {
            title,
            location,
            category,
            doLoop,
            doRemind,
            // time
            startTime,
            month: startDate.getMonth(),
            date: startDate.getDate(),
            day: startDate.getDay(),
            startMinute: stampTo5Minutes(startTime),
            endMinute: stampTo5Minutes(endTime),
            owner,
            participants,
        };
    };

    const dataToEvent = (data) => {
        const {
            title,
            location,
            category,
            doLoop,
            doRemind,
            month,
            date,
            day,
            startMinute,
            endMinute,
            owner,
            participants,
        } = data;
        const startDate = new Date(minutesToStamp(startMinute));
        const endDate = new Date(minutesToStamp(endMinute));
        startDate.setMonth(month);
        startDate.setDate(date);
        if (!doLoop) startDate.setDate(date - startDate.getDay() + day);
        endDate.setMonth(month);
        endDate.setDate(startDate.getDate());
        return {
            title,
            location,
            category,
            doLoop,
            doRemind,
            startTime: startDate.getTime(),
            endTime: endDate.getTime(),
            owner,
            participants,
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

    // view: what content will be shown in Calendar Page
    // non-temp(0), temp(1), search result(2)
    const [view, setView] = useState(0);
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
                // view
                view,
                setView,
            }}
        >
            {children}
        </EventContext.Provider>
    );
}

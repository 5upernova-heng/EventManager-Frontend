import React, { useState, useContext, createContext, useEffect } from "react";
import {
    getEventsApi,
    addEventApi,
    deleteEventApi,
    updateEventApi,
    searchEventsApi,
    impartMatter,
} from "../api/eventApi";
import { TimeContext } from "./TimeContextProvider";
import { minutesToStamp, stampTo5Minutes } from "../utils/calDate";
import { LoginContext } from "./LoginContextProvider";
import { toast } from "react-toastify";

export const EventContext = createContext();

export default function EventContextProvider({ children }) {
    const { date } = useContext(TimeContext);
    const time = date.getTime();
    const { isLogin, loginAccount } = useContext(LoginContext);
    const { username, userId: uid } = loginAccount;
    const emptyEvent = {
        title: "",
        startTime: 0,
        endTime: 0,
        location: -1,
        category: 0,
        doLoop: 0,
        doRemind: false,
        owner: username,
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
        if (isLogin) getEvents();
    }, [isLogin]);

    const getEvents = async () => {
        const { data } = await getEventsApi(uid, time, uid);
        if (typeof data.response === -1) toast(`找不到该用户: ${username}`);
        else setEvents(data.response);
    };

    /**  Distrube events to a 2D array*/
    const distrube = () => {
        const normalEvents = [[], [], [], [], [], [], []];
        const tempEvents = [];
        events.map((event) => {
            const date = new Date(event.startTime);
            if (event.category != 4) {
                if (event.doLoop == 1) {
                    for (let day = 0; day < 7; day++) {
                        normalEvents[day].push(event);
                    }
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
        // add event
        const { response } = await addEventApi(event, uid, time);
        // impart owner
        if (response.state !== 0) toast("添加失败");
        else {
            addOneParticipant(uid, response.id).then(() => {
                getEvents();
            });
        }
    };

    const updateEvent = async (newEvent) => {
        const { data: newEvents } = await updateEventApi(
            uid,
            time,
            newEvent.id,
            newEvent
        );
        console.log(newEvents.response);
        setEvents(newEvents.response);
    };

    const deleteEvent = async (id) => {
        const { data: newEvents } = await deleteEventApi(uid, time, id);
        console.log(newEvents.response);
        setEvents(newEvents.response);
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
        const { startTime, endTime } = event;
        const newEvent = structuredClone(event);
        const startDate = new Date(startTime);
        newEvent.month = startDate.getMonth();
        newEvent.date = startDate.getDate();
        newEvent.day = startDate.getDay();
        newEvent.startMinute = stampTo5Minutes(startTime);
        newEvent.endMinute = stampTo5Minutes(endTime);
        return newEvent;
    };

    const dataToEvent = (data) => {
        const {
            doLoop,
            month,
            date,
            day,
            startMinute,
            endMinute,
            participants,
        } = data;
        const event = structuredClone(data);
        const startDate = new Date(minutesToStamp(startMinute));
        const endDate = new Date(minutesToStamp(endMinute));
        startDate.setMonth(month);
        startDate.setDate(date);
        if (!doLoop) startDate.setDate(date - startDate.getDay() + day);
        endDate.setMonth(month);
        endDate.setDate(startDate.getDate());
        event.startTime = startDate.getTime();
        event.endTime = endDate.getTime();
        if (participants.length !== 0) {
            const newParticipants = participants.filter((participant) =>
                event.participants.includes(participant)
            );
            console.log(newParticipants);
            addParticipants(newParticipants, event).then(() => {
                return event;
            });
        } else {
            return event;
        }
    };

    /**Add one participant for a matter*/
    const addOneParticipant = async (userId, eventId) => {
        const { data } = await impartMatter(uid, userId, time, eventId);
        if (data.response === -2)
            toast("该事件与该用户的已有事件存在冲突，且优先级不足无法覆盖");
        if (data.response === -1) toast("用户不存在或已经参加");
        if (data.response === 1) toast("权限不足");
        if (data.response === 2)
            toast(
                "该事件与该用户的已有事件存在冲突，本事件优先级更高，可以覆盖"
            );
        return data.response;
    };

    const addParticipants = async (userIdList, event) => {
        userIdList.map((userId) => {
            const result = addOneParticipant(userId, event.id);
            if (result === 0 || result === 2) {
                event.participants.push(userId);
            }
        });
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

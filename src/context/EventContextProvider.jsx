import React, { useState, useContext, createContext, useEffect } from "react";
import {
    getEventsApi,
    addEventApi,
    deleteEventApi,
    updateEventApi,
    impartMatterApi,
    coverEventApi,
    quitMatterApi,
    getAvailableTimeApi,
} from "../api/eventApi";
import { TimeContext } from "./TimeContextProvider";
import {
    minutesToStamp,
    stampTo5Minutes,
    stampToString,
} from "../utils/calDate";
import { LoginContext } from "./LoginContextProvider";
import { toast } from "react-toastify";
import { MapContext } from "./MapContextProvider";

export const EventContext = createContext();

export default function EventContextProvider({ children }) {
    const { date } = useContext(TimeContext);
    const { getLocationName } = useContext(MapContext);
    const time = date.getTime();
    const { isLogin, loginAccount } = useContext(LoginContext);
    const { username, userId: uid } = loginAccount;
    const emptyEvent = {
        title: "",
        startTime: 0,
        endTime: 0,
        locationId: -1,
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

    /**  Distrube events to a 2D array*/
    const distrube = () => {
        const normalEvents = [[], [], [], [], [], [], []];
        const tempEvents = [];
        events.map((event) => {
            const date = new Date(event.startTime);
            if (event.category != 0) {
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

    const getEvents = async () => {
        const { response } = await getEventsApi(uid, time, uid);
        if (response === -1) toast(`找不到该用户: ${username}`);
        else setEvents(response);
    };

    const addEvent = async (event, data) => {
        // add event
        const { response } = await addEventApi(event, uid, time);
        const { participants, owner } = data;
        // impart owner
        if (response.state === -1) {
            toast("添加失败：操作者不存在");
            return;
        }
        if (response.state === 1) {
            toast("添加失败：权限不足");
            return;
        }
        toast("添加事件成功");
        // impart participants
        event.id = response.id;
        if (!participants.includes(owner)) participants.push(owner);
        await syncParticipants(participants, event);
        getEvents();
    };

    const updateEvent = async (newEvent, data, confirm) => {
        const { id, category } = newEvent;
        const { participants } = data;
        const { response } = await updateEventApi(
            uid,
            time,
            id,
            newEvent,
            confirm
        );
        if (response === -2) {
            /**TODO: */
            const availableTime = await getAvailableTime(newEvent);
            if (category < 3) {
                toast(
                    <>
                        <p className="mb-0 fw-bold">
                            修改失败：与已有事件发生冲突
                        </p>
                        <p className="mb-0 fw-bold">可以选择以下时间段：</p>
                        {availableTime}
                    </>
                );
            } else {
                toast("修改失败：与已有事件发生冲突且无法覆盖");
            }
            return;
        }
        if (response === -1) {
            toast("修改失败：用户不存在或权限等级不足");
            return;
        }
        if (response === 2) {
            toast(
                <>
                    <p>"[警告]本次修改发生了高权限覆盖低权限事件"</p>
                    <p>"是否继续修改？"</p>
                    <div className="d-flex justify-content-evenly">
                        <button
                            onClick={() => {
                                coverUpdateEvent(newEvent, data);
                            }}
                        >
                            是
                        </button>
                        <button>否</button>
                    </div>
                </>,
                {
                    autoClose: false,
                }
            );
            return;
        }
        await syncParticipants(participants, newEvent);
        getEvents();
        toast("事件修改成功");
    };

    const deleteEvent = async (id) => {
        const { response } = await deleteEventApi(uid, time, id);
        if (response === 1) {
            toast("删除失败：权限不足");
            return;
        }
        if (response === -1) {
            toast("删除失败：用户不存在");
            return;
        }
        toast("删除成功");
        getEvents();
    };

    /**Apply event cover */
    const coverNewEvent = async (eventId) => {
        const { response } = await coverEventApi(uid, time, uid, eventId);
        if (response === -1) toast("覆盖失败");
        if (response === 1) toast("覆盖失败：权限不足");
        toast("覆盖成功");
        getEvents();
        return;
    };

    const coverUpdateEvent = async (newEvent, data) => {
        updateEvent(newEvent, data, 1);
        const { response } = await coverEventApi(uid, time, uid, newEvent.id);
        if (response === -1) toast("覆盖失败");
        if (response === 1) toast("覆盖失败：权限不足");
        toast("覆盖成功");
        getEvents();
        return;
    };

    /**Return three available time */
    const getAvailableTime = async (newEvent) => {
        const { startTime, endTime, doLoop } = newEvent;
        const duration = endTime - startTime;
        const { response } = await getAvailableTimeApi(
            uid,
            time,
            duration,
            doLoop
        );
        return response.map((availableTime) => {
            const startStr = stampToString(availableTime.startTime);
            const endStr = stampToString(availableTime.endTime);
            return <p className="mb-0">{`${startStr} -- ${endStr}`};</p>;
        });
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
            locationId,
        } = data;
        console.log("data:", participants);
        const event = structuredClone(data);
        event.participants = choosedEvent.participants;
        // time
        const startDate = new Date(minutesToStamp(startMinute));
        const endDate = new Date(minutesToStamp(endMinute));
        startDate.setMonth(month);
        startDate.setDate(date);
        if (!doLoop) startDate.setDate(date - startDate.getDay() + day);
        endDate.setMonth(month);
        endDate.setDate(startDate.getDate());
        event.startTime = startDate.getTime();
        event.endTime = endDate.getTime();
        // location
        event.locationName = getLocationName(locationId);
        // participants
        return event;
    };

    /**Add one participant for a matter*/
    const addOneParticipant = async (userId, event) => {
        const { id, category } = event;
        const { response } = await impartMatterApi(uid, userId, time, id);
        if (response === -2) {
            const availableTime = await getAvailableTime(event);
            if (category < 3) {
                toast(
                    <>
                        <p className="mb-0 fw-bold">
                            添加用户 {userId} 到此事件失败：与已有事件发生冲突
                        </p>
                        <p className="mb-0 fw-bold">可以选择以下时间段：</p>
                        {availableTime}
                    </>
                );
            } else {
                toast(
                    `添加用户 ${userId} 到此事件失败：与已有事件发生冲突且无法覆盖`
                );
            }
        }
        if (response === -1) toast("用户不存在或已经参加");
        if (response === 1) toast("权限不足");
        if (response === 2)
            toast(
                <>
                    <p>
                        "[警告]该事件和用户 {userId}
                        的已有事件存在冲突，但因为优先级更高，可以覆盖"
                    </p>
                    <p>"是否继续修改？"</p>
                    <div className="d-flex justify-content-evenly">
                        <button
                            onClick={() => {
                                coverNewEvent(id);
                            }}
                        >
                            是
                        </button>
                        <button>否</button>
                    </div>
                </>,
                {
                    autoClose: false,
                }
            );
        return response;
    };

    const deleteOneParticipant = async (userId, eventId) => {
        const { response } = await quitMatterApi(uid, time, userId, eventId);
        if (response === -1) toast("用户不存在或已经参加");
        if (response === 1) toast("权限不足");
        return response;
    };

    const syncParticipants = async (newParticipants, event) => {
        const { participants: oldParticipants } = event;
        console.log(newParticipants, oldParticipants);
        return Promise.all([
            Promise.all(
                oldParticipants.map((participant) => {
                    if (!newParticipants.includes(participant)) {
                        console.log("DELETE");
                        return deleteOneParticipant(participant, event.id);
                    }
                })
            ),
            Promise.all(
                newParticipants.map((participant) => {
                    if (!oldParticipants.includes(participant)) {
                        console.log("ADD");
                        return addOneParticipant(participant, event);
                    }
                })
            ),
        ]);
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

import CalendarBar from "../components/calendar/CalendarBar";
import WeekCalendar from "../components/calendar/WeekCalendar";
import CalendarSideBar from "../components/calendar/CalendarSideBar";
import { useState, useEffect } from "react";

function Calendar() {
    const [distEvents, setDistEvents] = useState([[], [], [], [], [], [], []]);
    useEffect(() => {
        // mount:
        // 1. distribute events
        // 2. setTimeInterval
        const events = [
            {
                startTime: 8,
                endTime: 10,
                day: 0,
                date: 9,
                month: 3,
                category: 0,
                title: "课程事件",
                description: "这是一个课程事件",
            },
            {
                startTime: 15,
                endTime: 20,
                day: 2,
                date: 10,
                month: 3,
                category: 1,
                title: "个人事件",
                description: "这是一个学生个人事件",
            },
            {
                startTime: 7,
                endTime: 12,
                day: 4,
                date: 13,
                month: 3,
                category: 2,
                title: "团体事件",
                description: "这是一个学生发起的团体事件",
            },
        ];
        const newDistrube = [[], [], [], [], [], [], []];
        events.map((event) => {
            newDistrube[event.day].push(event);
        });
        setDistEvents(newDistrube);
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

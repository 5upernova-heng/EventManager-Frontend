import React, { Component } from "react";
import CalendarHead from "./CalendarHead";
import CalendarBody from "./CalendarBody";

class WeekCalendar extends Component {
    state = {
        events: [
            {
                startTime: 8,
                endTime: 10,
                day: 0,
                category: 0,
                title: "课程事件",
                description: "这是一个课程事件",
            },
            {
                startTime: 15,
                endTime: 20,
                day: 2,
                category: 1,
                title: "个人事件",
                description: "这是一个学生个人事件",
            },
            {
                startTime: 7,
                endTime: 12,
                day: 4,
                category: 2,
                title: "团体事件",
                description: "这是一个学生发起的团体事件",
            },
        ],
    };
    render() {
        const { date } = this.props;
        const { events } = this.state;
        return (
            <>
                <CalendarHead date={date} />
                <CalendarBody
                    date={date}
                    events={events}
                    setEvents={(events) => {
                        this.setState(events);
                    }}
                />
            </>
        );
    }
}

export default WeekCalendar;

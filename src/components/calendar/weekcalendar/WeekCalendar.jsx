import React, { Component } from "react";
import CalendarHead from "./CalendarHead";
import CalendarBody from "./CalendarBody";

class WeekCalendar extends Component {
    state = {
        events: [
            { startTime: 8, endTime: 10, day: 0 },
            { startTime: 15, endTime: 20, day: 2 },
        ],
    };
    render() {
        const { date } = this.props;
        const { events } = this.state;
        return (
            <>
                <CalendarHead date={date} />
                <CalendarBody date={date} events={events} />
            </>
        );
    }
}

export default WeekCalendar;

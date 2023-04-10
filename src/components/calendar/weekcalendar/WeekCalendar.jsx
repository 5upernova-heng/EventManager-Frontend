import { useState } from "react";
import CalendarHead from "./CalendarHead";
import CalendarBody from "./CalendarBody";

const WeekCalendar = ({ date, events }) => {
    return (
        <>
            <CalendarHead date={date} />
            <CalendarBody date={date} events={events} />
        </>
    );
};

export default WeekCalendar;

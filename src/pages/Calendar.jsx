import CalendarBar from "../components/calendar/CalendarBar";
import WeekCalendar from "../components/calendar/weekcalendar/WeekCalendar";
import { useState, useEffect } from "react";

function Calendar() {
    const [date, setDate] = useState(new Date());

    const getTime = () => {
        setDate(new Date());
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <CalendarBar date={date} />
            <div className="row container-fluid">
                <div className="col-2"></div>
                <div className="col">
                    <WeekCalendar date={date} />
                </div>
            </div>
        </>
    );
}

export default Calendar;

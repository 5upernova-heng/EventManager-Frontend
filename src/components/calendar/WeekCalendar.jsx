import CalendarHead from "./weekcalendar/CalendarHead";
import CalendarBody from "./weekcalendar/CalendarBody";

const WeekCalendar = ({ events }) => {
    return (
        <>
            <CalendarHead />
            <CalendarBody events={events} />
        </>
    );
};

export default WeekCalendar;

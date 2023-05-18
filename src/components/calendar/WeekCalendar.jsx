import CalendarHead from "./weekcalendar/CalendarHead";
import CalendarBody from "./weekcalendar/CalendarBody";
import "/src/styles/WeekCalendar.css";

const WeekCalendar = ({ events }) => {
    return (
        <>
            <div className="WeekCalendar">
                <CalendarHead />
                <CalendarBody events={events} />
            </div>
        </>
    );
};

export default WeekCalendar;

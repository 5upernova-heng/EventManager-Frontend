import CalendarHead from "./CalendarHead";
import CalendarBody from "./CalendarBody";

const WeekCalendar = ({ date }) => {
    return (
        <>
            <CalendarHead date={date} />
            <CalendarBody date={date} />
        </>
    );
};

export default WeekCalendar;

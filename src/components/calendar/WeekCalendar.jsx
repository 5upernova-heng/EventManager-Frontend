import CalendarHead from "./weekcalendar/CalendarHead";
import CalendarBody from "./weekcalendar/CalendarBody";
import "/src/styles/WeekCalendar.css";
import { EventContext } from "../../context/EventContextProvider";
import { useContext } from "react";

const WeekCalendar = () => {
    const { distrube } = useContext(EventContext);
    return (
        <>
            <div className="WeekCalendar">
                <CalendarHead />
                <CalendarBody events={distrube().normalEvents} />
            </div>
        </>
    );
};

export default WeekCalendar;

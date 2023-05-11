import { useContext } from "react";
import { getWeekDates } from "../../../utils/calDate";
import { TimeContext } from "../../../Context";

function createHeaderCells(date) {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = date.getDay();
    const dates = getWeekDates(date);
    return dates.map((d, index) => {
        return (
            <div
                className="col border border-white py-4 d-flex flex-column align-items-center justify-content-center"
                key={index}
            >
                <h4 className="text-center">{week[index]}</h4>
                {day === index ? (
                    <div className="badge bg-primary rounded-pill">
                        <h3 className="text-center mb-0">{d.getDate()}</h3>
                    </div>
                ) : (
                    <h3 className="text-center mb-0">{d.getDate()}</h3>
                )}
            </div>
        );
    });
}

function CalendarHead() {
    const { date } = useContext(TimeContext);
    return (
        <>
            <div className="row border">
                <div className="col-1"></div>
                {createHeaderCells(date)}
            </div>
        </>
    );
}

export default CalendarHead;

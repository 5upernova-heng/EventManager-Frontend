import { useContext } from "react";
import { getWeekDates } from "../../../utils/calDate";
import { TimeContext } from "../../../context/TimeContextProvider";

function createHeaderCells(date) {
    const week = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = date.getDay();
    const dates = getWeekDates(date);
    return dates.map((d, index) => {
        return (
            <div
                className="col border-start border-end py-3 d-flex flex-column align-items-center justify-content-center"
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
    const { viewDate: date, setViewDate: setDate } = useContext(TimeContext);
    return (
        <>
            <div className="row border">
                <div className="col-1 d-flex flex-column justify-content-evenly align-items-center">
                    <button
                        className="btn btn-outline-secondary rounded-circle py-1"
                        onClick={() => {
                            const newDate = new Date(date);
                            newDate.setDate(newDate.getDate() - 7);
                            setDate(newDate);
                        }}
                    >
                        <i
                            className="fa fa-arrow-up m-0"
                            aria-hidden="true"
                        ></i>
                    </button>
                    <button
                        className="btn btn-outline-secondary rounded-circle py-1"
                        onClick={() => {
                            const newDate = new Date(date);
                            newDate.setDate(newDate.getDate() + 7);
                            setDate(newDate);
                        }}
                    >
                        <i
                            className="fa fa-arrow-down m-0"
                            aria-hidden="true"
                        ></i>
                    </button>
                </div>
                {createHeaderCells(date)}
            </div>
        </>
    );
}

export default CalendarHead;

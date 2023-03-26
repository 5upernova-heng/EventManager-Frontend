import CalendarTimeColumn from "./CalendarTimeColumn";
import CalendarDateColumn from "./CalendarDateColumn";
import { getWeekDates, dateDiff } from "../../../utils/calDate";
import { useState } from "react";

// TODO: hardcoded

const CalendarBody = ({ date }) => {
    const [distEvents, setDistEvents] = useState([
        [{ startTime: 8, endTime: 10, date: new Date(2023, 2, 26) }],
        [],
        [{ startTime: 15, endTime: 20, date: new Date(2023, 2, 28) }],
        [],
        [],
        [],
        [],
    ]);
    const distribute = (dates, events) => {
        // distribute events at this week to an array
        // while each array is an array of event
        const startDate = new Date(dates[0]);
        const endDate = new Date(dates[6]);
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        const dEvents = dates.map(() => []);
        events.map((e) => {
            if (startDate <= e.date && endDate <= e.date) {
                console.log(e.date);
                const index = dateDiff(e.date, startDate);
                dEvents[index].push(e);
            }
        });
        setDistEvents(dEvents);
    };
    const createColumn = (date) => {
        const dates = getWeekDates(date);
        return dates.map((d, index) => (
            <div className="col p-0" key={index}>
                <CalendarDateColumn events={distEvents[index]} />
            </div>
        ));
    };
    return (
        <>
            <div
                style={{ maxHeight: "450px" }}
                className="row overflow-auto border"
            >
                <div className="col-1 p-0">
                    <CalendarTimeColumn />
                </div>
                {createColumn(date)}
            </div>
        </>
    );
};

export default CalendarBody;

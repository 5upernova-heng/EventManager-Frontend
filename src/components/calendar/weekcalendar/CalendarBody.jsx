import { useState } from "react";
import { getWeekDates } from "../../../utils/calDate";

import CalendarTimeColumn from "./CalendarTimeColumn";
import CalendarDateColumn from "./CalendarDateColumn";
import EventModal from "../../EventModal";

const CalendarBody = ({ date, events }) => {
    const emptyEvent = {
        title: "",
        startTime: 0,
        endTime: 1,
        date: 0,
        month: 0,
        day: 0,
        description: "",
    };
    const [choosedEvent, setChoosedEvent] = useState(emptyEvent);
    const handleEventChange = (e) => {
        const newEvent = { ...choosedEvent };
        const { name, value } = e.currentTarget;
        newEvent[name] = value;
        setChoosedEvent(newEvent);
    };
    const dates = getWeekDates(date);
    const cellClickHandler = (row, index) => {
        setChoosedEvent({
            title: "",
            startTime: row,
            endTime: row + 1,
            date: dates[index].getDate(),
            month: dates[index].getMonth(),
            day: index,
            description: "",
        });
    };
    const createColumn = () => {
        return dates.map((d, index) => (
            <div className="col p-0" key={index}>
                <CalendarDateColumn
                    events={events[index]}
                    cellClickHandler={(row) => {
                        cellClickHandler(row, index);
                    }}
                    eventClickHandler={(event) => {
                        setChoosedEvent(event);
                    }}
                />
            </div>
        ));
    };
    return (
        <>
            <div
                style={{ maxHeight: "600px" }}
                className="row overflow-auto border"
            >
                <div className="col-1 p-0">
                    <CalendarTimeColumn />
                </div>
                {createColumn()}
            </div>
            <EventModal
                id="addEvent"
                titleLabel="添加事件"
                choosedEvent={choosedEvent}
                eventChangeHandler={handleEventChange}
                submitButtonLabel="提交添加"
            />
            <EventModal
                id="modifyEvent"
                titleLabel="修改事件"
                choosedEvent={choosedEvent}
                eventChangeHandler={handleEventChange}
                submitHandler={() => {}}
                submitButtonLabel="提交修改"
            />
        </>
    );
};

export default CalendarBody;

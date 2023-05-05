import { createContext, useContext, useState } from "react";
import { TimeContext } from "../../../App";
import { getWeekDates } from "../../../utils/calDate";

import CalendarTimeColumn from "./CalendarTimeColumn";
import CalendarDateColumn from "./CalendarDateColumn";
import ModelGroup from "../../ModalGroup";

export const EventContext = createContext();

const CalendarBody = ({ events }) => {
    const { date } = useContext(TimeContext);
    const emptyEvent = {
        title: "",
        startTime: 0,
        endTime: 0,
        description: "",
    };
    const [choosedEvent, setChoosedEvent] = useState(emptyEvent);
    const dates = getWeekDates(date);
    const setCellEvent = (row, col) => {
        const startTime = new Date(date);
        startTime.setDate(date.getDate() - date.getDay() + row);
        startTime.setHours(col);
        const endTime = new Date(startTime);
        endTime.setHours(col + 1);
        setChoosedEvent({
            title: "",
            startTime: startTime.getTime(),
            endTime: endTime.getTime(),
            description: "",
        });
    };
    const setEventEvent = (event) => {
        setChoosedEvent(event);
    };
    const createColumn = () => {
        return dates.map((_, index) => (
            <div className="col p-0" key={index}>
                <CalendarDateColumn events={events[index]} row={index} />
            </div>
        ));
    };
    return (
        <>
            <EventContext.Provider
                value={{
                    choosedEvent,
                    setCellEvent,
                    setEventEvent,
                }}
            >
                <div
                    style={{ maxHeight: "600px" }}
                    className="row overflow-auto border"
                >
                    <div className="col-1 p-0">
                        <CalendarTimeColumn />
                    </div>
                    {createColumn()}
                </div>
                <ModelGroup />
            </EventContext.Provider>
        </>
    );
};

export default CalendarBody;

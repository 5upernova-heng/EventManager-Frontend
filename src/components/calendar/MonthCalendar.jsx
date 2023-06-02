import DateCell from "./monthcalendar/DateCell";
import { TimeContext } from "../../context/TimeContextProvider";
import { monthList, getWeekDates } from "../../utils/calDate";
import { useContext } from "react";
import MonthCalendarHead from "./monthcalendar/MonthCalendarHead";

const MonthCalendar = () => {
    const { viewDate: date, setViewDate: setDate } = useContext(TimeContext);
    const currentMonth = date.getMonth();
    const getMonthDates = () => {
        const newDate = new Date(date);
        newDate.setDate(1);
        const monthDates = [];
        while (newDate.getMonth() === currentMonth) {
            monthDates.push(getWeekDates(newDate));
            newDate.setDate(newDate.getDate() + 7);
        }
        const lastDate = new Date(monthDates[monthDates.length - 1][6]);
        lastDate.setDate(lastDate.getDate() + 1);
        if (lastDate.getMonth() === currentMonth) {
            monthDates.push(getWeekDates(lastDate));
        }
        return monthDates;
    };
    const renderDateCells = () => {
        const monthDates = getMonthDates();
        return monthDates.map((weekDates, weekIndex) => (
            <div key={weekIndex} className="d-flex justify-content-between">
                {weekDates.map((singleDate, dateIndex) => (
                    <DateCell
                        key={dateIndex}
                        date={singleDate}
                        setDate={setDate}
                        currentDate={date}
                    />
                ))}
            </div>
        ));
    };
    return (
        <>
            <div className="p-2">
                <h4 className="text-center fw-bold">
                    {monthList[currentMonth]}
                </h4>
                <div>{<MonthCalendarHead />}</div>
                <div className="d-flex flex-column justify-content-center">
                    {renderDateCells()}
                </div>
            </div>
        </>
    );
};

export default MonthCalendar;

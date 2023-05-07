import PropTypes from "prop-types";
import { useContext } from "react";

import { TimeContext } from "../../../App";
import { getWeekDates } from "../../../utils/calDate";

import CalendarTimeColumn from "./CalendarTimeColumn";
import CalendarDateColumn from "./CalendarDateColumn";
import ModelGroup from "../../ModalGroup";
import { EventContext } from "../../../pages/Calendar";

const CalendarBody = ({ events }) => {
    const { date } = useContext(TimeContext);
    const { officialColorSet, personalColorSet } = useContext(EventContext);
    const dates = getWeekDates(date);

    const createColumn = () => {
        return dates.map((_, index) => (
            <div className="col p-0" key={index}>
                <CalendarDateColumn events={events[index]} row={index} />
            </div>
        ));
    };
    const renderExample = () => {
        const officialLabel = ["课程事件", "考试事件"];
        const personalLabel = ["个人事务", "团体事务", "临时事务"];
        return (
            <>
                {officialLabel.map((label, index) => (
                    <div
                        key={index}
                        className="d-flex justify-content-center align-items-center"
                    >
                        {label}
                        <span
                            className={`badge bg-${officialColorSet[index]} mx-2`}
                            style={{ height: "20px", width: "20px" }}
                        >
                            {" "}
                        </span>
                    </div>
                ))}
                {personalLabel.map((label, index) => (
                    <div
                        key={index}
                        className="d-flex justify-content-center align-items-center"
                    >
                        {label}
                        <span
                            className={`badge bg-${personalColorSet[index]} mx-2`}
                            style={{ height: "20px", width: "20px" }}
                        >
                            {" "}
                        </span>
                    </div>
                ))}
            </>
        );
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
            <div className="d-flex align-items-center justify-content-evenly py-4">
                {renderExample()}
            </div>

            <ModelGroup />
        </>
    );
};

CalendarBody.propTypes = {
    events: PropTypes.arrayOf(PropTypes.array),
};

export default CalendarBody;

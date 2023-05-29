import PropTypes from "prop-types";
import { useContext } from "react";

import { TimeContext } from "../../../context/TimeContextProvider";
import { getWeekDates } from "../../../utils/calDate";

import CalendarTimeColumn from "./CalendarTimeColumn";
import CalendarDateColumn from "./CalendarDateColumn";
import STYLE from "../../../style";

const CalendarBody = ({ events }) => {
    const { date } = useContext(TimeContext);
    const dates = getWeekDates(date);

    const createColumn = () => {
        return dates.map((_, index) => (
            <div className="col p-0" key={index}>
                <CalendarDateColumn events={events[index]} row={index} />
            </div>
        ));
    };
    const renderExample = () => {
        return (
            <>
                {STYLE.categoryLabel.map((label, index) => {
                    return (
                        index < 4 && (
                            <div
                                key={index}
                                className="fs-5 d-flex justify-content-center align-items-center"
                            >
                                {label}
                                <span
                                    className={`badge bg-${STYLE.colorSet[index]} mx-2`}
                                    style={{ height: "20px", width: "20px" }}
                                >
                                    {" "}
                                </span>
                            </div>
                        )
                    );
                })}
            </>
        );
    };
    return (
        <>
            <div
                style={{ height: "calc(100vh - 320px)" }}
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
        </>
    );
};

CalendarBody.propTypes = {
    events: PropTypes.arrayOf(PropTypes.array),
};

export default CalendarBody;

import PropTypes from "prop-types";
import { useContext } from "react";

import { TimeContext } from "../../../context/TimeContextProvider";
import { getWeekDates } from "../../../utils/calDate";

import CalendarTimeColumn from "./CalendarTimeColumn";
import CalendarDateColumn from "./CalendarDateColumn";
import ModelGroup from "../../ModalGroup";
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
                        <div
                            key={index}
                            className="d-flex justify-content-center align-items-center"
                        >
                            {label}
                            <span
                                className={`badge bg-${STYLE.colorSet[index]} mx-2`}
                                style={{ height: "20px", width: "20px" }}
                            >
                                {" "}
                            </span>
                        </div>
                    );
                })}
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

import PropTypes from "prop-types";
import { useContext } from "react";

import { TimeContext } from "../../../App";
import { getWeekDates } from "../../../utils/calDate";

import CalendarTimeColumn from "./CalendarTimeColumn";
import CalendarDateColumn from "./CalendarDateColumn";
import ModelGroup from "../../ModalGroup";

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
            <ModelGroup />
        </>
    );
};

CalendarBody.propTypes = {
    events: PropTypes.arrayOf(PropTypes.array),
};

export default CalendarBody;

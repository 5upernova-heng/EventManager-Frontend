// a column of week calendar.
// a column container a header, which is the date and weekday
// then it follows 24 cells, represents 24 hours
// Finally, we render the event of the day, using
import PropTypes from "prop-types";

import EventContainer from "./EventContainer";
import EmptyCell from "./EmptyCell";

const CalendarDateColumn = ({ events, row }) => {
    const createCells = () => {
        const cells = [];
        for (let i = 6; i < 22; i++) {
            cells.push(<EmptyCell key={i} row={row} col={i} />);
        }
        return cells;
    };

    return (
        <div className="d-flex position-relative flex-wrap flex-column align-items-stretch justify-content-center">
            {createCells()}
            <EventContainer events={events} />
        </div>
    );
};

CalendarDateColumn.propTypes = {
    events: PropTypes.array,
    row: PropTypes.number,
};

export default CalendarDateColumn;

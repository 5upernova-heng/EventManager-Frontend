// a column of week calendar.
// a column container a header, which is the date and weekday
// then it follows 24 cells, represents 24 hours
// Finally, we render the event of the day, using
import EventContainer from "./EventContainer";
import EmptyCell from "./EmptyCell";

function createCells() {
    const cells = [];
    for (let i = 0; i < 24; i++) {
        cells.push(<EmptyCell key={i} />);
    }
    return cells;
}

const CalendarDateColumn = ({ events }) => {
    return (
        <div className="d-flex position-relative flex-wrap flex-column align-items-stretch justify-content-center">
            {createCells()}
            <EventContainer events={events} />
        </div>
    );
};

export default CalendarDateColumn;

function calStyle(event) {
    // console.log(event.startTime / 24);
    return {
        top: `${(event.startTime / 24) * 100}%`,
        bottom: `${(1 - event.endTime / 24) * 100}%`,
    };
}

const EventCell = ({ event }) => {
    return (
        <div
            className="position-absolute p-4 start-0 end-0 ms-1 me-2 border bg-primary opacity-75 rounded"
            style={calStyle(event)}
        ></div>
    );
};

export default EventCell;

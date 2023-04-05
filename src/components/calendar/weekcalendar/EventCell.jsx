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
            className="position-absolute p-2 start-0 end-0 ms-1 me-2 border bg-primary rounded overflow-auto"
            style={calStyle(event)}
        >
            <p className="fs-5 mb-0 fw-bold">课程</p>
            <p className="fs-6 mb-0">{`${event.startTime}:00-${event.endTime}:00`}</p>
            <p className="fs-6 mb-0">这是一个课程描述</p>
        </div>
    );
};

export default EventCell;

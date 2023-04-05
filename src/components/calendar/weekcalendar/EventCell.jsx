import { Modal } from "bootstrap/js/dist/modal";

function calStyle(event) {
    return {
        top: `${(event.startTime / 24) * 100}%`,
        bottom: `${(1 - event.endTime / 24) * 100}%`,
    };
}

const EventCell = ({ event, handleClick }) => {
    return (
        <div
            className="position-absolute p-2 start-0 end-0 ms-1 me-2 border bg-primary rounded overflow-auto"
            style={calStyle(event)}
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modifyEvent"
            onClick={() => handleClick(event)}
        >
            <p className="fs-5 mb-0 text-white fw-bold">课程</p>
            <p className="fs-6 mb-0 text-white">{`${event.startTime}:00-${event.endTime}:00`}</p>
            <p className="fs-6 mb-0 text-white">这是一个课程描述</p>
        </div>
    );
};

export default EventCell;

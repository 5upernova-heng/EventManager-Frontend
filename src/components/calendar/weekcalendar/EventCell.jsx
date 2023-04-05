import { Modal } from "bootstrap/js/dist/modal";

const EventCell = ({ event, handleClick }) => {
    const calStyle = () => {
        return {
            top: `${(event.startTime / 24) * 100}%`,
            bottom: `${(1 - event.endTime / 24) * 100}%`,
        };
    };

    const renderStyleClass = () => {
        const baseStyle =
            "position-absolute p-2 start-0 end-0 ms-1 me-2 border rounded overflow-auto ";
        const backgroundColorSet = ["bg-primary", "bg-success", "bg-info"];
        return baseStyle + backgroundColorSet[event.category];
    };
    return (
        <div
            className={renderStyleClass()}
            style={calStyle(event)}
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modifyEvent"
            onClick={() => handleClick(event)}
        >
            <p className="fs-5 mb-0 text-white fw-bold">{`${event.title}`}</p>
            <p className="fs-6 mb-0 text-white">{`${event.startTime}:00-${event.endTime}:00`}</p>
            <p className="fs-6 mb-0 text-white">{`${event.description}`}</p>
        </div>
    );
};

export default EventCell;

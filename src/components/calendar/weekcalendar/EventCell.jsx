import { useState } from "react";

const EventCell = ({ event, handleClick }) => {
    const [hover, setHover] = useState(false);
    const calStyle = () => {
        return {
            top: `${(event.startTime / 24) * 100}%`,
            bottom: `${(1 - event.endTime / 24) * 100}%`,
        };
    };

    const renderStyle = () => {
        const baseStyle = hover
            ? "position-absolute p-2 start-0 end-0 ms-0 me-0 border rounded rounded-4 overflow-auto "
            : "position-absolute p-2 start-0 end-0 ms-1 me-1 my-1 border rounded rounded-4 overflow-auto ";
        const backgroundColorSet = ["bg-primary", "bg-success", "bg-info"];
        return baseStyle + backgroundColorSet[event.category];
    };
    return (
        <div
            className={renderStyle()}
            style={calStyle(event)}
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#modifyEvent"
            onClick={() => handleClick(event)}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            <p className="fs-5 mb-0 text-white fw-bold">{`${event.title}`}</p>
            <p className="fs-6 mb-0 text-white">{`${event.startTime}:00-${event.endTime}:00`}</p>
            <p className="fs-6 mb-0 text-white">{`${event.description}`}</p>
        </div>
    );
};

export default EventCell;

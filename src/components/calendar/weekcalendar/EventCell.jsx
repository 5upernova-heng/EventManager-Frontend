import { Modal } from "bootstrap";
import { useContext, useState } from "react";
import { EventContext } from "../../../pages/Calendar";

const EventCell = ({ event }) => {
    const [hover, setHover] = useState(false);
    const { setEventEvent } = useContext(EventContext);
    const { startTime, endTime, title, description } = event;
    const startHour = new Date(startTime).getHours();
    const endHour = new Date(endTime).getHours();
    const calStyle = () => {
        return {
            top: `${(startHour / 24) * 100}%`,
            bottom: `${(1 - endHour / 24) * 100}%`,
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
            onClick={() => setEventEvent(event)}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            <p className="fs-5 mb-0 text-white fw-bold">{`${title}`}</p>
            <p className="fs-6 mb-0 text-white">{`${startHour}:00-${endHour}:00`}</p>
            <p className="fs-6 mb-0 text-white">{`${description}`}</p>
        </div>
    );
};

export default EventCell;

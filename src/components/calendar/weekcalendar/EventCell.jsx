import { Modal } from "bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { EventContext } from "../../../pages/Calendar";
import { AuthContext } from "../../../context/AuthContextProvider";
import { toast } from "react-toastify";

const EventCell = ({ event }) => {
    const eventRef = useRef(null);
    const [hover, setHover] = useState(false);
    const [overflow, setOverflow] = useState(false);
    const { auth } = useContext(AuthContext);
    const { setEventEvent, getEventColor } = useContext(EventContext);
    const { startTime, endTime, title, description, isOfficial } = event;
    const startHour = new Date(startTime).getHours();
    const endHour = new Date(endTime).getHours();
    const editable = !isOfficial || auth;

    useEffect(() => {
        setOverflow(
            eventRef.current.clientHeight < eventRef.current.scrollHeight
        );
    }, [event]);

    const calStyle = () => {
        const top = `${(startHour / 24) * 100}%`;
        const bottom = `${(1 - endHour / 24) * 100}%`;
        return hover
            ? {
                  top,
                  bottom: overflow ? "" : bottom,
              }
            : {
                  top,
                  bottom,
              };
    };

    const renderStyle = () => {
        const baseStyle =
            "position-absolute p-2 start-0 end-0 border rounded rounded-4 overflow-auto ";
        const hoverStyle = hover ? "ms-0 me-0" : "ms-1 me-1 my-1";
        const colorStyle = getEventColor(event);
        return `${baseStyle} bg-${colorStyle} ${hoverStyle}`;
    };
    return (
        <div
            ref={eventRef}
            className={renderStyle()}
            style={calStyle(event)}
            type="button"
            data-bs-toggle={editable ? "modal" : false}
            data-bs-target={editable ? "#modifyEvent" : false}
            onClick={
                editable
                    ? () => setEventEvent(event)
                    : () => toast("你没有编辑权限哦~")
            }
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            <p className="fs-5 mb-0 text-white fw-bold">{`${title}`}</p>
            <p className="fs-6 mb-0 text-white">{`${startHour}:00-${endHour}:00`}</p>
            <p
                className="fs-6 mb-0 text-white"
                style={{ whiteSpace: "pre-line" }}
            >{`${description}`}</p>
        </div>
    );
};

export default EventCell;

import { Modal } from "bootstrap";
import { useContext, useEffect, useRef, useState } from "react";
import { EventContext } from "../../../context/EventContextProvider";
import { LoginContext } from "../../../context/LoginContextProvider";
import { toast } from "react-toastify";
import { MapContext } from "../../../context/MapContextProvider";
import { minutesToString, stampTo5Minutes } from "../../../utils/calDate";
import STYLE from "../../../style";

const EventCell = ({ event }) => {
    const eventRef = useRef(null);
    // style
    const [hover, setHover] = useState(false);
    const [overflow, setOverflow] = useState(false);
    const { setEventEvent } = useContext(EventContext);
    // data
    const { getLocationName } = useContext(MapContext);
    const { startTime, endTime, title, locationId, category, doLoop } = event;
    const startMinute = stampTo5Minutes(startTime);
    const endMinute = stampTo5Minutes(endTime);
    // auth
    const { auth } = useContext(LoginContext);
    const editable = category > 1 || auth;

    const categoryLabel = STYLE.getCategoryLabel(category);
    const loopLabel = STYLE.getLoopLabel(doLoop);

    useEffect(() => {
        setOverflow(
            eventRef.current.clientHeight < eventRef.current.scrollHeight
        );
    }, [event]);

    const calStyle = () => {
        const top = `${((startMinute - 72) / 192) * 100}%`;
        const bottom = `${(1 - (endMinute - 72) / 192) * 100}%`;
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
            "position-absolute p-2 start-0 end-0 border rounded rounded-4 overflow-auto shadow ";
        const hoverStyle = hover ? "ms-0 me-0" : "ms-1 me-1 my-1";
        const colorStyle = STYLE.getCategoryColor(category);
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
            <p className="fs-5 mb-0 text-white fw-bold">{`[${categoryLabel}]${title}`}</p>
            <p className="fs-6 mb-0 text-white">{`${loopLabel} | ${minutesToString(
                startMinute
            )}-${minutesToString(endMinute)}`}</p>
            <p
                className="fs-6 mb-0 text-white"
                style={{ whiteSpace: "pre-line" }}
            >{`${getLocationName(locationId)}`}</p>
        </div>
    );
};

export default EventCell;

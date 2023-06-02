import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { getDayString, getTimeString, stampToDay } from "../utils/calDate";
import STYLE from "../style";
import { MapContext } from "../context/MapContextProvider";
import { TimeContext } from "../context/TimeContextProvider";

function EventCard({ event }) {
    const [hover, setHover] = useState(false);
    const { startTime, endTime, title, doLoop, category, location } = event;
    const { date } = useContext(TimeContext);
    const { getLocationName } = useContext(MapContext);

    const parseTimeString = (timeStamp) => {
        const date = new Date(timeStamp);
        return getTimeString(date.getHours(), date.getMinutes());
    };

    const startTimeStr = parseTimeString(startTime);
    const endTimeStr = parseTimeString(endTime);
    const dayStr = stampToDay(startTime);

    return (
        <div
            className={`d-flex justify-content-between rounded my-2 p-2 ${
                hover ? "border shadow" : ""
            }`}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
        >
            <div className="d-flex">
                <div className="d-flex flex-column justify-content-between pe-1">
                    <p className="mb-1 fs-4 text-secondary">{startTimeStr}</p>
                    <p className="mb-0 fs-4 text-secondary">{endTimeStr}</p>
                </div>
                <div
                    className={`ms-3 me-4 p-1 bg-${STYLE.getCategoryColor(
                        category
                    )} rounded`}
                ></div>
                <div className="d-flex flex-column justify-content-between pe-1">
                    <p className="fw-bold fs-3 mb-1">{title}</p>
                    <p className="fs-4 mb-0">{`${STYLE.getCategoryLabel(
                        category
                    )} | ${
                        STYLE.timeLabel[doLoop]
                    } ${dayStr} | ${getLocationName(location)}`}</p>
                </div>
            </div>
        </div>
    );
}

EventCard.propTypes = {
    event: PropTypes.object,
};

export default EventCard;

import React, { useContext } from "react";
import PropTypes from "prop-types";
import { getTimeString } from "../utils/calDate";
import STYLE from "../style";
import { MapContext } from "../context/MapContextProvider";

function EventCard({ event }) {
    const { startTime, endTime, title, doLoop, category, location } = event;
    const { getLocationName } = useContext(MapContext);

    const parseTimeString = (timeStamp) => {
        const date = new Date(timeStamp);
        return getTimeString(date.getHours(), date.getMinutes());
    };

    const startTimeStr = parseTimeString(startTime);
    const endTimeStr = parseTimeString(endTime);

    return (
        <div className="d-flex justify-content-between my-3 p-2">
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
                    )} | ${STYLE.timeLabel[doLoop]} | ${getLocationName(
                        location
                    )}`}</p>
                </div>
            </div>
            <div className="d-flex align-items-center">
                <p className="fs-4">3 小时后</p>
            </div>
        </div>
    );
}

EventCard.propTypes = {
    event: PropTypes.object,
};

export default EventCard;

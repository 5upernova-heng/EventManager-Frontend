import React from "react";
import PropTypes from "prop-types";
import { getTimeString } from "../utils/calDate";

function EventCard({ event }) {
    const { startTime, endTime, title, isOnce } = event;

    const parseTimeString = (timeStamp) => {
        const date = new Date(timeStamp);
        return getTimeString(date.getHours(), date.getMinutes());
    };

    const startTimeStr = parseTimeString(startTime);
    const endTimeStr = parseTimeString(endTime);

    const officialColorSet = ["primary", "danger"];
    const personalColorSet = ["success", "info", "secondary"];
    const officialCategoryLabel = ["课程", "考试"];
    const personalCategoryLabel = ["个人", "团体", "临时"];
    const intervalLabel = ["单次", "每周"];

    const getEventLabel = (event) => {
        const { isOfficial, category } = event;
        return isOfficial
            ? officialCategoryLabel[category]
            : personalCategoryLabel[category];
    };

    const getEventColor = (event) => {
        const { isOfficial, category } = event;
        return isOfficial
            ? officialColorSet[category]
            : personalColorSet[category];
    };

    return (
        <div className="d-flex my-3 p-2">
            <div className="d-flex flex-column justify-content-between pe-1">
                <p className="mb-1 fs-4 text-secondary">{startTimeStr}</p>
                <p className="mb-0 fs-4 text-secondary">{endTimeStr}</p>
            </div>
            <div
                className={`ms-3 me-4 p-1 bg-${getEventColor(event)} rounded`}
            ></div>
            <div className="d-flex flex-column justify-content-between pe-1">
                <p className="fw-bold fs-3 mb-1">{title}</p>
                <p className="fs-4 mb-0">{`${getEventLabel(event)} | ${
                    intervalLabel[isOnce]
                } | 教三楼 3-217`}</p>
            </div>
            <div style={{ width: "20rem" }}></div>
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

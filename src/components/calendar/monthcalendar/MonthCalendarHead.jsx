import React from "react";

function MonthCalendarHead() {
    const renderHeader = () => {
        const dayLabel = ["S", "M", "T", "W", "T", "F", "S"];
        return dayLabel.map((day, index) => (
            <span key={index} className="p-1">
                <p className="mb-0 fw-bold fs-6 text-center">{`${day}`}</p>
            </span>
        ));
    };
    return (
        <div className="d-flex justify-content-between">{renderHeader()}</div>
    );
}

export default MonthCalendarHead;

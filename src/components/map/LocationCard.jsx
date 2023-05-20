import React from "react";
import PropTypes from "prop-types";

export default function LocationCard({ label, selected, toggleSelected }) {
    const renderStyle = () => {
        const shadow = selected && focus ? "shadow" : "";
        return `location-card p-3 border border-3 border-secondary-subtle rounded rounded-4 ${shadow}`;
    };
    return (
        <>
            <div
                className={renderStyle()}
                onClick={() => {
                    toggleSelected();
                }}
            >
                <p className="mb-0 fs-4 fw-bold text-center">{`${label}: Small shadow`}</p>
            </div>
        </>
    );
}

LocationCard.propTypes = {
    label: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    toggleSelected: PropTypes.func.isRequired,
};

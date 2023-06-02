import React, { useContext } from "react";
import PropTypes from "prop-types";
import STYLE from "../../../style";

export default function CheckLabelButtonGroup({
    searchLabels,
    toggleSearchLabels,
    styleLabel,
}) {
    const renderButtons = () => {
        return styleLabel.map((label, index) => {
            return (
                <button
                    key={index}
                    type="button"
                    className={`btn btn-sm btn-outline-secondary ${
                        searchLabels[index] ? "active" : ""
                    }`}
                    onClick={() => toggleSearchLabels(index)}
                >
                    {label}
                </button>
            );
        });
    };
    return (
        <div className="btn-group" role="group">
            {renderButtons()}
        </div>
    );
}

CheckLabelButtonGroup.propTypes = {
    searchLabels: PropTypes.arrayOf(PropTypes.bool).isRequired,
    toggleSearchLabels: PropTypes.func.isRequired,
    styleLabel: PropTypes.arrayOf(PropTypes.string).isRequired,
};

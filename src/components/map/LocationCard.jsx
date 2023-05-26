import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MapContext } from "../../context/MapContextProvider";

export default function LocationCard({ id, selected, toggleSelected }) {
    const { mode, navPoints, getLocationName, deleteNavPoint } =
        useContext(MapContext);
    return (
        <>
            <div
                className="location-card d-flex align-items-center p-3 border border-3 border-secondary-subtle rounded rounded-4"
                onClick={() => {
                    toggleSelected();
                }}
            >
                <div className="flex-grow-1">
                    <p className="mb-0 fs-4 fw-bold text-center">
                        {selected && (
                            <i
                                className="fa fa-arrow-right"
                                aria-hidden="true"
                            ></i>
                        )}
                        {getLocationName(id)}
                    </p>
                </div>
                {selected && navPoints.length > 2 && mode === 1 && (
                    <button
                        onClick={() => {
                            deleteNavPoint(id);
                        }}
                        className="btn btn-sm rounded-circle btn-danger"
                    >
                        <i className="fa fa-minus" aria-hidden="true"></i>
                    </button>
                )}
            </div>
        </>
    );
}

LocationCard.propTypes = {
    id: PropTypes.number.isRequired,
    deletable: PropTypes.bool.isRequired,
    selected: PropTypes.bool.isRequired,
    toggleSelected: PropTypes.func.isRequired,
};

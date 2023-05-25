import React, { useContext } from "react";
import PropTypes from "prop-types";
import { MapContext } from "../../context/MapContextProvider";
import "/src/styles/LocationSelector.css";

function LocationSelector({ selected, changeLocation }) {
    const { allNodes } = useContext(MapContext);
    const renderNodes = () => {
        return allNodes.map((node, index) => {
            return (
                <span
                    style={{
                        cursor: "pointer",
                    }}
                    key={index}
                    onClick={() => {
                        changeLocation(index);
                    }}
                    className={`${
                        index === selected ? "bg-primary" : "bg-secondary"
                    } d-inline-block mx-1 my-1 border px-2 py-1 rounded rounded-pill opacity-75`}
                >
                    <p className="mb-0 fs-6 text-white">{node.name}</p>
                </span>
            );
        });
    };
    return (
        <div
            className="p-1 rounded"
            style={{
                whiteSpace: "no-wrap",
                wordBreak: "keep-all",
                maxWidth: "40rem",
                overflow: "auto",
            }}
        >
            {renderNodes()}
        </div>
    );
}

LocationSelector.propTypes = {
    selected: PropTypes.number,
    changeLocation: PropTypes.func,
};

export default LocationSelector;

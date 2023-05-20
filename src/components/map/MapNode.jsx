import React from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import "/src/styles/MapNode.css";
import { MapContext } from "../../context/MapContextProvider";

function MapNode({ node, selected }) {
    const { fixedX, fixedY, scale, addNavPoint } = useContext(MapContext);
    const { id, x, y, name } = node;

    return (
        <div
            className={`p-2 rounded-circle map-node shadow ${
                selected ? "bg-primary" : "bg-success"
            }`}
            style={{
                top: `${fixedY(y)}px`,
                left: `${fixedX(x)}px`,
                position: "absolute",
                transform: `scale(${1 / scale})`,
            }}
            onClick={() => {
                addNavPoint(id);
            }}
            data-tooltip={`${id}-${name}`}
            data-show={selected}
        ></div>
    );
}

MapNode.propTypes = {
    node: PropTypes.object.isRequired,
    selected: PropTypes.bool,
};

export default MapNode;

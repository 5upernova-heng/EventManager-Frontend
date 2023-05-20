import React from "react";
import { useContext } from "react";
import PropTypes from "prop-types";
import "/src/styles/MapNode.css";
import { MapContext } from "../../context/MapContextProvider";

function MapNode({ node }) {
    const { fixedX, fixedY, scale } = useContext(MapContext);
    const { id, x, y, name } = node;

    return (
        <div
            className="p-2 rounded-circle bg-success map-node shadow"
            style={{
                top: `${fixedY(y)}px`,
                left: `${fixedX(x)}px`,
                position: "absolute",
                transform: `scale(${1 / scale})`,
            }}
            data-tooltip={`${id}-${name}`}
        ></div>
    );
}

MapNode.propTypes = {
    node: PropTypes.object.isRequired,
};

export default MapNode;

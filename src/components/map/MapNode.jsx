import React from "react";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import "/src/styles/MapNode.css";
import { MapContext } from "../../context/MapContextProvider";

function MapNode({ node, selected }) {
    const { fixedX, fixedY, scale, addNavPoint } = useContext(MapContext);
    const { id, x, y, name } = node;

    const [hover, setHover] = useState(false);

    const calStyle = () => {
        return {
            top: `${fixedY(y)}px`,
            left: `${fixedX(x)}px`,
            position: "absolute",
            transform: `scale(${1 / scale})`,
        };
    };

    const renderToolTip = () => {
        return (
            <div
                className="position-absolute p-2 rounded"
                style={{
                    position: "absolute",
                    top: "-.25rem",
                    left: "50%",
                    transform: `translateX(-50%) translateY(-100%) scale(${
                        selected || hover ? 1 : 0
                    })`,
                    transition: "150ms",
                    transformOrigin: "bottom",
                    color: "white",
                    background: "#333",
                    textAlign: "center",
                    width: "max-content",
                }}
            >
                {name}
            </div>
        );
    };

    return (
        <div
            className={`p-2 rounded-circle shadow ${
                selected ? "bg-primary" : "bg-success"
            }`}
            style={calStyle()}
            onClick={() => {
                addNavPoint(id);
            }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            data-tooltip={`${id}-${name}`}
        >
            {renderToolTip()}
        </div>
    );
}

MapNode.propTypes = {
    node: PropTypes.object.isRequired,
    selected: PropTypes.bool,
};

export default MapNode;

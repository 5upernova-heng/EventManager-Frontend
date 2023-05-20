import React from "react";
import PropTypes from "prop-types";
import MapNode from "./MapNode";

function MapLayer({ nodes }) {
    const renderNodes = () => {
        return nodes.map((node, index) => {
            return <MapNode key={index} node={node} />;
        });
    };
    return <>{renderNodes()}</>;
}

MapLayer.propTypes = {
    nodes: PropTypes.arrayOf(PropTypes.object),
};

export default MapLayer;

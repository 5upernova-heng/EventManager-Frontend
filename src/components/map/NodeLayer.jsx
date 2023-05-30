import React, { useContext } from "react";
import MapNode from "./MapNode";
import { MapContext } from "../../context/MapContextProvider";

function NodeLayer({ nodes, scale, fixedX, fixedY }) {
    const { navPoints, showAllNodes } = useContext(MapContext);
    const renderNodes = () => {
        return nodes
            .filter((node) => showAllNodes || navPoints.includes(node.id))
            .map((node, index) => {
                return (
                    <MapNode
                        key={index}
                        node={node}
                        selected={navPoints.includes(node.id)}
                        scale={scale}
                        fixedX={fixedX}
                        fixedY={fixedY}
                    />
                );
            });
    };
    return <>{renderNodes()}</>;
}

export default NodeLayer;

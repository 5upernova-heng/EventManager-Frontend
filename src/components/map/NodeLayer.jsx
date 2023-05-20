import React, { useContext } from "react";
import MapNode from "./MapNode";
import { MapContext } from "../../context/MapContextProvider";

function NodeLayer() {
    const { allNodes, navPoints, showAllNodes } = useContext(MapContext);
    const renderNodes = () => {
        return allNodes
            .filter((node) => showAllNodes || navPoints.includes(node.id))
            .map((node, index) => {
                return (
                    <MapNode
                        key={index}
                        node={node}
                        selected={navPoints.includes(node.id)}
                    />
                );
            });
    };
    return <>{renderNodes()}</>;
}

export default NodeLayer;

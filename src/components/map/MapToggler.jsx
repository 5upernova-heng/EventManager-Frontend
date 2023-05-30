import React, { useContext, useState } from "react";
import { MapContext } from "../../context/MapContextProvider";
import { maps } from "../../map.js";

export default function MapToggler() {
    const { map: currentMap, view, setView, setMap } = useContext(MapContext);
    const renderMap = () => {
        return maps.map((map, index) => {
            const shouldRenderChildren = map.children.length > 0;
            const renderChildren = () => {
                return map.children.map((childMap, childIndex) => {
                    console.log(currentMap.name, childMap.name);
                    const isActive = currentMap.name === childMap.name;
                    return (
                        <li key={childIndex}>
                            <div
                                className={`p-2 rounded ${
                                    isActive
                                        ? "bg-primary text-white"
                                        : undefined
                                }`}
                                onClick={() => {
                                    setView(index);
                                    setMap(childMap);
                                }}
                            >
                                {childMap.name}
                            </div>
                        </li>
                    );
                });
            };
            return (
                <div key={index} className="dropend">
                    <div
                        className={`fs-5 view ${
                            index === view && "map-active"
                        } ${shouldRenderChildren && "dropdown-togger"}`}
                        onClick={() => {
                            setView(index);
                            if (shouldRenderChildren) setMap(map.children[0]);
                            else setMap(map);
                        }}
                        data-bs-toggle="dropdown"
                    >
                        {map.name}
                    </div>
                    {shouldRenderChildren && (
                        <ul
                            className="dropdown-menu py-0"
                            style={{ minWidth: 0 }}
                        >
                            {renderChildren()}
                        </ul>
                    )}
                </div>
            );
        });
    };
    return (
        <div className="position-absolute top-0 end-0 mt-1">
            <div className="d-flex flex-column align-items-end gap-2">
                {renderMap()}
            </div>
        </div>
    );
}

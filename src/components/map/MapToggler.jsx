import React, { useContext, useState } from "react";
import { MapContext } from "../../context/MapContextProvider";
import { maps } from "../../map.js";

export default function MapToggler() {
    const { view, setView, setMap } = useContext(MapContext);
    const renderMap = () => {
        return maps.map((map, index) => {
            return (
                <div
                    className={`fs-5 view ${index === view && "active"}`}
                    onClick={() => {
                        setView(index);
                        setMap(map);
                    }}
                >
                    {map.name}
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

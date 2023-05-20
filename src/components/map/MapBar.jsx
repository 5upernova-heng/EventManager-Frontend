import React from "react";
import LocationSelector from "./LocationSelector";

import "/src/styles/MapBar.css";

export default function MapBar() {
    return (
        <>
            <div className="map-bar border shadow shadow-lg">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <LocationSelector />
                    <button className="mt-3 btn btn-lg btn-primary">
                        开始计算路线
                    </button>
                </div>
            </div>
        </>
    );
}

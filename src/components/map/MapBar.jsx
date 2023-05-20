import React, { useContext } from "react";
import NavSelector from "./NavSelector";

import "/src/styles/MapBar.css";
import { MapContext } from "../../context/MapContextProvider";

export default function MapBar() {
    const { navPoints, clearNavPoints } = useContext(MapContext);
    const shouldHidden = () => {
        return navPoints.some((pid) => pid === -1);
    };
    return (
        <>
            <div className="map-bar border shadow shadow-lg">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <NavSelector />
                    <div className="mt-3">
                        <button
                            className="btn btn-lg btn-danger mx-2"
                            onClick={() => {
                                clearNavPoints();
                            }}
                        >
                            清空
                        </button>
                        <button
                            hidden={shouldHidden()}
                            className="btn btn-lg btn-primary mx-2"
                        >
                            开始计算路线
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

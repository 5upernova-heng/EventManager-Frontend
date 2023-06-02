import React, { useContext, useState } from "react";
import NavSelector from "./NavSelector";
import SelectButtonGroup from "../forms/SelectButtonGroup";
import MapToggler from "./MapToggler";

import "/src/styles/MapBar.css";
import { MapContext } from "../../context/MapContextProvider";
import STYLE from "../../style";

export default function MapBar() {
    const {
        mode,
        setMode,
        navPoints,
        addNavPoint,
        clearNavPoints,
        setSelected,
        setShowRoutes,
        findRoute,
    } = useContext(MapContext);
    const shouldHidden = () => {
        return navPoints.some((pid) => pid === -1);
    };
    return (
        <>
            <div className="map-bar border shadow shadow-lg">
                <div className="mt-5">
                    <SelectButtonGroup
                        buttonsInfo={STYLE.parseButtonInfo(
                            STYLE.mapModeStyle,
                            mode
                        )}
                        changeSelect={setMode}
                    />
                    <p className="mt-3 fw-bold fs-5 text-center">
                        {STYLE.modePrompt[mode]}
                    </p>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <NavSelector />
                    <div className="mt-3">
                        {mode === 1 && (
                            <button
                                className="btn btn-lg btn-success"
                                type="button"
                                onClick={() => {
                                    addNavPoint(-1);
                                    setSelected(navPoints.length - 1);
                                }}
                            >
                                添加
                            </button>
                        )}
                        <button
                            className="btn btn-lg btn-danger mx-2"
                            onClick={() => {
                                clearNavPoints();
                            }}
                        >
                            重置
                        </button>
                        <button
                            hidden={shouldHidden()}
                            className="btn btn-lg btn-primary mx-2"
                            onClick={() => {
                                findRoute();
                                setShowRoutes(true);
                            }}
                        >
                            开始计算路线
                        </button>
                    </div>
                </div>
                <MapToggler />
            </div>
        </>
    );
}

import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { getNodesApi, getRoutesApi } from "../api/mapApi";

export const MapContext = createContext();
export default function MapContextProvider({ children }) {
    const imgWidth = 1421;
    const imgHeight = 2002;
    const scaleX = imgWidth / 26.4372;
    const scaleY = imgHeight / 36.3141;
    const [allNodes, setAllNodes] = useState([]);
    const [routes, setRoutes] = useState([]);

    const [scale, setScale] = useState(1);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [lastTranslate, setLastTranslate] = useState({ x: 0, y: 0 });
    const scaleMin = 0.2;
    const scaleMax = 4.0;

    const [showAllNodes, setShowAllNodes] = useState(false);
    const [showRoutes, setShowRoutes] = useState(false);
    // selected nav point (-1 for not selected)
    const [selectedNav, setSelected] = useState(-1);
    const [navLength, setNavLength] = useState(2);
    // only id
    const [navPoints, setNavPoints] = useState([]);

    useEffect(() => {
        // mount node and route data
        fetchNodes();
        fetchRoutes();
        // init navPoints
        setNavPoints(initNavpoints());
    }, []);

    useEffect(() => {
        setShowAllNodes(selectedNav === -1 ? false : true);
    }, [selectedNav]);

    const fetchNodes = async () => {
        const { data } = await getNodesApi();
        setAllNodes(data);
    };
    const fetchRoutes = async () => {
        const { data } = await getRoutesApi();
        setRoutes(data);
    };
    const fixedX = (x) => {
        return x * scaleX;
    };

    const fixedY = (y) => {
        return imgHeight - y * scaleY;
    };

    const addNavPoint = (id) => {
        const newNav = [...navPoints];
        if (selectedNav === -1) {
            console.log("This should never be triggered.");
        } else {
            newNav[selectedNav] = id;
        }
        setNavPoints(newNav);
    };

    const initNavpoints = () => {
        const navPoints = [];
        for (let i = 0; i < navLength; i++) {
            navPoints.push(-1);
        }
        navPoints[0] = 34;
        return navPoints;
    };

    const setNavPoint = (index, location) => {
        const newNav = [...navPoints];
        newNav[index] = location;
        setNavPoints(newNav);
    };

    const clearNavPoints = () => {
        const newNav = [...navPoints];
        for (let i = 0; i < navLength; i++) {
            newNav[i] = -1;
        }
        setNavPoints(newNav);
        setSelected(-1);
    };

    const getLocationName = (id) => {
        if (id < allNodes.length && id >= 0) {
            if (allNodes.length !== 0) {
                return allNodes[id] ? allNodes[id].name : "未选择地点";
            }
        } else {
            return "未选择地点";
        }
    };

    return (
        <MapContext.Provider
            value={{
                // Assets
                imgWidth,
                imgHeight,
                allNodes,
                routes,
                getLocationName,
                // Transformation
                fixedX,
                fixedY,
                scale,
                setScale,
                scaleMin,
                scaleMax,
                startPoint,
                setStartPoint,
                translate,
                setTranslate,
                lastTranslate,
                setLastTranslate,
                showAllNodes,
                showRoutes,
                // Guidance
                navPoints,
                navLength,
                selectedNav,
                setNavPoint,
                setSelected,
                addNavPoint,
                clearNavPoints,
            }}
        >
            {children}
        </MapContext.Provider>
    );
}

import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { findPathApi, getNodesApi, getRoutesApi } from "../api/mapApi";

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
    const [selectedNav, setSelected] = useState(0);
    // only id
    const [navPoints, setNavPoints] = useState([]);
    // mode: single dest route finding(0) or multi-dest route finding(1)
    const [mode, setMode] = useState(0);

    useEffect(() => {
        // mount node and route data
        fetchNodes();
        // fetchRoutes();
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
        navPoints.push(id);
        setNavPoints(navPoints);
    };

    const initNavpoints = () => {
        const navPoints = [];
        for (let i = 0; i < 2; i++) {
            navPoints.push(-1);
        }
        navPoints[0] = 34;
        return navPoints;
    };

    const setNavPoint = (location) => {
        const newNav = [...navPoints];
        newNav[selectedNav] = location;
        setNavPoints(newNav);
    };

    const deleteNavPoint = (id) => {
        const index = navPoints.indexOf(id);
        navPoints.splice(index, 1);
        setNavPoints(navPoints);
    };

    const clearNavPoints = () => {
        setNavPoints([-1, -1]);
        setSelected(-1);
    };

    const findPath = async () => {
        const { data: path } = await findPathApi();
        setRoutes(path);
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
                setShowRoutes,
                // Guidance
                navPoints,
                selectedNav,
                setNavPoint,
                setSelected,
                addNavPoint,
                deleteNavPoint,
                clearNavPoints,
                findPath,
                // view mode
                mode,
                setMode,
            }}
        >
            {children}
        </MapContext.Provider>
    );
}

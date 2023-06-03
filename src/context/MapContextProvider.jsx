import React, { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import { findRouteApi, getNodesApi } from "../api/mapApi";
import { maps } from "../map";
import { LoginContext } from "./LoginContextProvider";
import { TimeContext } from "./TimeContextProvider";

export const MapContext = createContext();
export default function MapContextProvider({ children }) {
    const { isLogin, loginAccount } = useContext(LoginContext);
    const { date } = useContext(TimeContext);
    const { userId: uid } = loginAccount;
    const time = date.getTime();

    const [allNodes, setAllNodes] = useState([]);
    const [nodes, setNodes] = useState([]);
    const [routes, setRoutes] = useState([]);
    const [allRoutes, setAllRoutes] = useState([]);

    const [showAllNodes, setShowAllNodes] = useState(true);
    const [showAllTips, setShowAllTips] = useState(false);
    const [showRoutes, setShowRoutes] = useState(false);
    // selected nav point (-1 for not selected)
    const [selectedNav, setSelected] = useState(0);
    // only id
    const [navPoints, setNavPoints] = useState([]);
    // mode: single dest route finding(0) or multi-dest route finding(1)
    const [mode, setMode] = useState(0);
    // view: which map should be shown
    const [view, setView] = useState(0);
    const [map, setMap] = useState(maps[view]);
    // ride: allow ride or not
    const [ride, setRide] = useState(true);

    useEffect(() => {
        // mount node and route data
        if (isLogin) {
            fetchNodes();
            // init navPoints
        }
    }, [isLogin]);

    useEffect(() => {
        setNodes(distrubeNodes());
        setRoutes(distrubeRoutes());
    }, [view, map, allRoutes]);

    useEffect(() => {
        setShowAllNodes(selectedNav === -1 ? false : true);
    }, [selectedNav]);

    const initNodes = () => {
        setNodes(distrubeNodes());
    };

    const distrubeNodes = () => {
        const distNodes = [];
        const [minIndex, maxIndex] = [...map.nodeRange];
        allNodes.map((node) => {
            if (minIndex <= node.id && node.id <= maxIndex)
                distNodes.push(node);
        });
        return distNodes;
    };

    const fetchNodes = async () => {
        const { response } = await getNodesApi();
        setAllNodes(response);
        setNavPoints(initNavpoints());
        setNodes(distrubeNodes());
        console.log("nodes", nodes);
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

    const distrubeRoutes = () => {
        const distRoutes = [];
        const [minIndex, maxIndex] = [...map.nodeRange];
        allRoutes.map((route) => {
            if (
                minIndex <= route[0] &&
                route[0] <= maxIndex &&
                minIndex <= route[1] &&
                route[1] <= maxIndex
            )
                distRoutes.push(route);
        });
        return distRoutes;
    };

    const findRoute = async () => {
        const passBy = [...navPoints];
        const start = passBy.splice(0, 1)[0];
        const { response } = await findRouteApi(uid, time, start, passBy, ride);
        const resultRoutes = response.map((route) => {
            return [route.start, route.end, route.bike];
        });
        setAllRoutes(resultRoutes);
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
                // utils
                getLocationName,
                allNodes,
                initNodes,
                // Map Props
                map,
                nodes,
                routes,
                // Transformation
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
                findRoute,
                // guide option
                ride,
                setRide,
                // view mode
                mode,
                setMode,
                view,
                setView,
                setMap,
                showAllTips,
                setShowAllTips,
            }}
        >
            {children}
        </MapContext.Provider>
    );
}

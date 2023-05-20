import React, { createContext } from "react";
import { useEffect, useState } from "react";
import { getNodesApi, getRoutesApi } from "../api/mapApi";

export const MapContext = createContext();
export default function MapContextProvider({ children }) {
    const imgWidth = 1421;
    const imgHeight = 2002;
    const scaleX = imgWidth / 26.4372;
    const scaleY = imgHeight / 36.3141;
    const [nodes, setNodes] = useState([]);
    const [routes, setRoutes] = useState([]);

    const [scale, setScale] = useState(1);
    const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
    const [translate, setTranslate] = useState({ x: 0, y: 0 });
    const [lastTranslate, setLastTranslate] = useState({ x: 0, y: 0 });
    const scaleMin = 0.2;
    const scaleMax = 4.0;

    useEffect(() => {
        // mount node and route data
        const fetchNodes = async () => {
            const { data } = await getNodesApi();
            setNodes(data);
        };
        const fetchRoutes = async () => {
            const { data } = await getRoutesApi();
            setRoutes(data);
        };
        fetchNodes();
        fetchRoutes();
    }, []);

    const fixedX = (x) => {
        return x * scaleX;
    };

    const fixedY = (y) => {
        return imgHeight - y * scaleY;
    };

    return (
        <MapContext.Provider
            value={{
                imgWidth,
                imgHeight,
                nodes,
                routes,
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
            }}
        >
            {children}
        </MapContext.Provider>
    );
}

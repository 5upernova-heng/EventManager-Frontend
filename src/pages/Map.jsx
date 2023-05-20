import LiveMap from "../components/map/LiveMap";
import { useContext } from "react";
import { MapContext } from "../context/MapContextProvider";
import MapBar from "../components/map/MapBar";
import "/src/styles/Map.css";
const Map = () => {
    const { routes, nodes } = useContext(MapContext);
    return (
        <>
            <MapBar />
            <LiveMap draw />
        </>
    );
};

export default Map;

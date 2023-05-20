import LiveMap from "../components/map/LiveMap";
import { useContext } from "react";
import { MapContext } from "../context/MapContextProvider";
import MapBar from "../components/map/MapBar";
import "/src/styles/Map.css";
const Map = () => {
    const { routes, nodes } = useContext(MapContext);
    return (
        <>
            <div className="row">
                <div className="col-3 p-0">
                    <MapBar />
                </div>
                <div className="col">
                    <LiveMap draw routes={routes} nodes={nodes} />
                </div>
            </div>
        </>
    );
};

export default Map;

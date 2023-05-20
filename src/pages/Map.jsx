import LiveMap from "../components/LiveMap";
import { useContext } from "react";
import { MapContext } from "../context/MapContextProvider";
const Map = () => {
    const { routes, nodes } = useContext(MapContext);
    return (
        <>
            <div className="row">
                <div className="col-3">
                    <h1>Spacer</h1>
                </div>
                <div className="col">
                    <LiveMap draw routes={routes} nodes={nodes} />
                </div>
            </div>
        </>
    );
};

export default Map;

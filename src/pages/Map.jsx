import LiveMap from "../components/map/LiveMap";
import MapBar from "../components/map/MapBar";
import "/src/styles/Map.css";
const Map = () => {
    return (
        <>
            <MapBar />
            <LiveMap />
        </>
    );
};

export default Map;

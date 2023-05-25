import React, { useContext } from "react";
import { MapContext } from "../../context/MapContextProvider";
import LocationSelector from "../forms/LocationSelector";
import { Link, useNavigate } from "react-router-dom";

function ChooseStart() {
    const { navPoints, setNavPoint, getLocationName } = useContext(MapContext);
    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <p className="mb-0">{`起始地点：${getLocationName(
                    navPoints[0]
                )}`}</p>
                <button
                    className="btn btn-outline-dark"
                    data-bs-toggle="collapse"
                    data-bs-target="#sideBarMapCollapse"
                >
                    <i className="fa fa-map-marker" aria-hidden="true"></i>
                </button>
            </div>
            <div className="collapse " id="sideBarMapCollapse">
                <div
                    className="me-2 mt-3 p-1 border rounded"
                    style={{
                        maxHeight: "20rem",
                        maxWidth: "22rem",
                        overflow: "auto",
                    }}
                >
                    <LocationSelector
                        selected={navPoints[0]}
                        changeLocation={(location) => {
                            setNavPoint(0, location);
                        }}
                    />
                </div>
                <div className="d-flex justify-content-end align-items-center mt-2 me-2">
                    <Link to="/map">
                        <button className="btn btn-primary">
                            地图{" "}
                            <i
                                className="fa fa-location-arrow"
                                aria-hidden="true"
                            ></i>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ChooseStart;

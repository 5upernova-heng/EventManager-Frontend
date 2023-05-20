import React, { useContext } from "react";
import LocationCard from "./LocationCard";
import { MapContext } from "../../context/MapContextProvider";

export default function NavSelector() {
    const { allNodes, navPoints, navLength, selectedNav, setSelected } =
        useContext(MapContext);
    const getLabel = (index) => {
        if (index === 0) return "起始地";
        if (index === navLength - 1) return "目的地";
        return `途径点 ${index}`;
    };

    const renderNavCard = () => {
        return navPoints.map((pid, index) => {
            const label = getLabel(index);
            return (
                <div
                    key={`card-${index}`}
                    className="d-flex flex-column align-items-center"
                >
                    <LocationCard
                        label={label}
                        locationName={pid === -1 ? "" : allNodes[pid].name}
                        selected={selectedNav === index}
                        toggleSelected={() => {
                            setSelected(selectedNav === index ? -1 : index);
                        }}
                    />
                    {
                        // show hr or not
                        index !== navLength - 1 ? (
                            <div
                                className="p-1 bg-primary"
                                style={{
                                    height: "10rem",
                                }}
                            ></div>
                        ) : (
                            ""
                        )
                    }
                </div>
            );
        });
    };
    return (
        <div className="d-flex flex-column justify-content-center align-items-center px-3  pt-3">
            {renderNavCard()}
        </div>
    );
}

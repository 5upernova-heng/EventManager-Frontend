import React, { useContext } from "react";
import LocationCard from "./LocationCard";
import { MapContext } from "../../context/MapContextProvider";

export default function NavSelector() {
    const { mode, allNodes, navPoints, selectedNav, setSelected } =
        useContext(MapContext);
    const renderNavCard = () => {
        return navPoints
            .filter((_, index) => mode === 1 || index < 2)
            .map((pid, index) => {
                return (
                    <div
                        key={`card-${index}`}
                        className="d-flex flex-column align-items-center"
                    >
                        <LocationCard
                            id={pid}
                            deletable={allNodes.length > 2}
                            selected={selectedNav === index}
                            toggleSelected={() => {
                                setSelected(selectedNav === index ? -1 : index);
                            }}
                        />
                        {
                            // show hr or not
                            mode === 1 ||
                                (index === 0 && (
                                    <div
                                        className="p-1 bg-primary"
                                        style={{
                                            height: "10rem",
                                        }}
                                    ></div>
                                ))
                        }
                    </div>
                );
            });
    };
    return (
        <div className="d-flex flex-column justify-content-center align-items-center px-3  pt-3">
            <div className={mode === 1 && "border border-3 rounded rounded-4"}>
                {renderNavCard()}
            </div>
        </div>
    );
}

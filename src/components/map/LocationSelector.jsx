import React from "react";
import { useState } from "react";
import LocationCard from "./LocationCard";

export default function LocationSelector() {
    const [selected, setSelected] = useState(0);
    const start = 0;
    const end = 1;
    return (
        <div className="d-flex flex-column justify-content-center align-items-center px-3  pt-3">
            <div className="px-2">
                <LocationCard
                    id={start}
                    label="起始地"
                    selected={selected == start}
                    toggleSelected={() => {
                        setSelected(start);
                    }}
                />
            </div>
            <div
                className="p-1 bg-primary"
                style={{
                    height: "10rem",
                }}
            ></div>
            <div className="px-2">
                <LocationCard
                    id={end}
                    label="目的地"
                    selected={selected == end}
                    toggleSelected={() => {
                        setSelected(end);
                    }}
                />
            </div>
        </div>
    );
}

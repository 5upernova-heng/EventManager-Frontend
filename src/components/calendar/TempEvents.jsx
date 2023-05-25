import React from "react";
import EventCard from "../EventCard";
import { EventContext } from "../../context/EventContextProvider";
import { useContext } from "react";

/**The page for display temparory event */
export default function TempEvents() {
    const { setEventEvent, distrube } = useContext(EventContext);
    const renderEvents = () => {
        return distrube().tempEvents.map((event, index) => {
            return (
                <div
                    style={{ cursor: "pointer" }}
                    key={index}
                    data-bs-toggle="modal"
                    data-bs-target="#modifyEvent"
                    onClick={setEventEvent(event)}
                >
                    <EventCard event={event} />
                </div>
            );
        });
    };
    return (
        <div className="row">
            <div className="col">{renderEvents()}</div>
            <div className="col-2 bg-primary"></div>
        </div>
    );
}

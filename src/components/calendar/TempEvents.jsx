import React from "react";
import EventCard from "../EventCard";
import { EventContext } from "../../context/EventContextProvider";
import { useContext } from "react";

/**The page for display temparory event */
export default function TempEvents() {
    const { setEventEvent, distrube } = useContext(EventContext);
    const renderEvents = () => {
        const { tempEvents } = distrube();
        if (tempEvents.length > 0) {
            return tempEvents.map((event, index) => {
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
        } else {
            return <h1 className="text-center mt-4">暂无临时事件</h1>;
        }
    };
    return (
        <div className="row">
            <div className="col">{renderEvents()}</div>
        </div>
    );
}

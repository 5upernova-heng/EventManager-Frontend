import React from "react";
import { useContext } from "react";
import { EventContext } from "../../context/EventContextProvider";
import EventCard from "../EventCard";

export default function SearchResult() {
    const { setEventEvent, searchResult } = useContext(EventContext);
    const renderEvents = () => {
        if (searchResult.length === 0)
            return <h1 className="text-center mt-5">无搜索结果</h1>;
        return searchResult.map((event, index) => {
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
        </div>
    );
}

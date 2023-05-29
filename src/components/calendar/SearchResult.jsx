import React from "react";
import { useContext } from "react";
import { EventContext } from "../../context/EventContextProvider";
import { SearchContext } from "../../context/SearchContextProvider";
import EventCard from "../EventCard";
import SearchLabelButtonGroup from "./search/SearchLabelButtonGroup";
import SearchModeButtonGroup from "./search/SearchModeButtonGroup";

export default function SearchResult() {
    const { searchResult, clearResult } = useContext(SearchContext);
    const { setEventEvent } = useContext(EventContext);
    const renderOptions = () => {
        return (
            <div className="d-flex justify-content-evenly gap-3 mt-3">
                <div className="d-flex flex-grow-1 justify-content-evenly align-items-center">
                    <div>
                        <p className="mb-1 fw-bold">搜索范围</p>
                        <SearchLabelButtonGroup />
                    </div>
                    <div>
                        <p className="mb-1 fw-bold">搜索模式</p>
                        <SearchModeButtonGroup />
                    </div>
                </div>
                <div className="d-flex align-items-end">
                    <button
                        className="btn btn-sm btn-danger"
                        onClick={() => {
                            clearResult();
                        }}
                    >
                        重置
                    </button>
                </div>
            </div>
        );
    };
    const renderEvents = () => {
        if (searchResult.length === 0)
            return <h2 className="text-center mt-3">无搜索结果</h2>;
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
        <div>
            <div>{renderOptions()}</div>
            <hr></hr>
            <div>{renderEvents()}</div>
        </div>
    );
}

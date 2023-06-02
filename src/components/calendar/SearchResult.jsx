import React from "react";
import { useContext } from "react";
import { EventContext } from "../../context/EventContextProvider";
import { SearchContext } from "../../context/SearchContextProvider";
import EventCard from "../EventCard";
import CheckLabelButtonGroup from "./search/CheckLabelButtonGroup";
import SearchModeButtonGroup from "./search/SearchModeButtonGroup";
import STYLE from "../../style";
import SelectButtonGroup from "../forms/SelectButtonGroup";
import Modal from "../Modal";
import TimeRangeSelector from "../forms/TimeRangeSelector";
import { stampToString } from "../../utils/calDate";

export default function SearchResult() {
    const {
        // searchLabelRange
        searchLabels,
        toggleSearchLabels,
        // filter
        category,
        setCategory,
        doLoop,
        setDoLoop,
        startTime,
        endTime,
        submitData,
        changeData,
        saveTimeChange,
        filterLabels,
        toggleFilterLabels,
        // result
        searchResult,
        clearResult,
    } = useContext(SearchContext);
    const { setEventEvent } = useContext(EventContext);
    const renderOptions = () => {
        return (
            <>
                <div className="d-flex justify-content-evenly gap-3 mt-3">
                    <div className="d-flex flex-grow-1 justify-content-evenly align-items-center">
                        <div>
                            <p className="mb-1 fw-bold">搜索范围（多选）</p>
                            <CheckLabelButtonGroup
                                searchLabels={searchLabels}
                                toggleSearchLabels={toggleSearchLabels}
                                styleLabel={STYLE.keywordLabel}
                            />
                        </div>
                        <div>
                            <p className="mb-1 fw-bold">搜索模式</p>
                            <SearchModeButtonGroup />
                        </div>
                        <div>
                            <p className="mb-1 fw-bold">筛选标签（多选）</p>
                            <CheckLabelButtonGroup
                                searchLabels={filterLabels}
                                toggleSearchLabels={toggleFilterLabels}
                                styleLabel={STYLE.filterLabel}
                            />
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
                <div className="d-flex justify-content-evenly gap-3 mt-3">
                    <div className="d-flex flex-grow-1 justify-content-evenly align-items-center">
                        <div hidden={!filterLabels[0]}>
                            <p className="mb-1 fw-bold">时间</p>
                            <div className="d-flex align-items-center gap-3">
                                <div>
                                    <p className="mb-0">{`开始时间：${stampToString(
                                        startTime
                                    )}`}</p>
                                    <p className="mb-0">{`结束时间：${stampToString(
                                        endTime
                                    )}`}</p>
                                </div>
                                <button
                                    className="btn btn-sm btn-primary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modifyFilterTime"
                                >
                                    修改
                                </button>
                            </div>
                        </div>
                        <div hidden={!filterLabels[1]}>
                            <p className="mb-1 fw-bold">事件类型</p>
                            <SelectButtonGroup
                                buttonsInfo={STYLE.parseButtonInfo(
                                    STYLE.categoryStyle,
                                    category
                                )}
                                changeSelect={setCategory}
                            />
                        </div>
                        <div hidden={!filterLabels[2]}>
                            <p className="mb-1 fw-bold">事件周期</p>
                            <SelectButtonGroup
                                buttonsInfo={STYLE.parseButtonInfo(
                                    STYLE.timeStyle,
                                    doLoop
                                )}
                                changeSelect={setDoLoop}
                            />
                        </div>
                    </div>
                </div>
            </>
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
    const { startMinute, endMinute, startMonth, startDate, endMonth, endDate } =
        submitData;
    return (
        <div>
            <div>{renderOptions()}</div>
            <hr></hr>
            <div>{renderEvents()}</div>
            <Modal
                id="modifyFilterTime"
                size=""
                headerLabel="修改时间"
                bodyComponent={
                    <TimeRangeSelector
                        id="filterTimeSelector"
                        startMinute={startMinute}
                        endMinute={endMinute}
                        startMonth={startMonth}
                        startDate={startDate}
                        endMonth={endMonth}
                        endDate={endDate}
                        changeData={changeData}
                    />
                }
                footerComponent={
                    <>
                        <button
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            取消
                        </button>
                        <button
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={saveTimeChange}
                        >
                            确认
                        </button>
                    </>
                }
            />
        </div>
    );
}

import { useEffect, useState } from "react";

function getDateString(date) {
    return `
    ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
    ${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
}

function CalendarBar({ date, tick, sync, clickHandler }) {
    return (
        <>
            <div className="container-fluid py-3 border-bottom">
                <div className="row">
                    <div className="col-3 d-flex align-items-center justify-content-center">
                        <p className="fs-3 mb-0 mx-2 text-center">
                            {getDateString(date)}
                        </p>
                        <div
                            className="btn-group btn-group-sm mx-2"
                            role="group"
                            aria-label="Basic outlined example"
                        >
                            <button
                                type="button"
                                onClick={clickHandler}
                                className="btn btn-outline-dark"
                            >
                                {tick || sync ? (
                                    <i
                                        className="fa fa-pause"
                                        aria-hidden="true"
                                    ></i>
                                ) : (
                                    <i
                                        className="fa fa-play"
                                        aria-hidden="true"
                                    ></i>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="col d-flex align-items-center justify-content-end gap-3">
                        <div className="flex-grow-1 mr-3">
                            <input
                                className="p-2 form-control me-auto"
                                placeholder="搜索事件"
                            ></input>
                        </div>
                        <button className="btn btn-secondary">搜索</button>
                        <div className="vr"></div>
                        <button className="btn btn-outline-primary">
                            添加事件
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CalendarBar;

import Time from "../Time";

function CalendarBar() {
    return (
        <>
            <div className="container-fluid py-3 border-bottom">
                <div className="row">
                    <div className="col-3 d-flex align-items-center justify-content-center">
                        <Time />
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
                        <button
                            className="btn btn-outline-primary"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#addEvent"
                        >
                            添加事件
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CalendarBar;

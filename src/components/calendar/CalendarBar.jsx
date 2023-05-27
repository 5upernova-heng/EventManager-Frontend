import SearchBar from "./SearchBar";
import ViewToggler from "./ViewToggler";

function CalendarBar() {
    return (
        <>
            <div className="container-fluid py-3 border-bottom">
                <div className="row">
                    <div className="col-3 d-flex align-items-center justify-content-center">
                        <ViewToggler />
                    </div>
                    <div className="col d-flex align-items-center justify-content-end gap-3">
                        <SearchBar />
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

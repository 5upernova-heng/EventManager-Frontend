const AddEvent = ({ choosedCell }) => {
    return (
        <>
            <div className="modal" tabindex="-1" id="addEvent">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">添加事件</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <p>
                                Default Input Cell:{" "}
                                {choosedCell
                                    ? `Col: ${choosedCell.col} Row: ${choosedCell.row}`
                                    : "None"}
                            </p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                取消
                            </button>
                            <button
                                type="button"
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                            >
                                添加
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddEvent;

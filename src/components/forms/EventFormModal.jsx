import Input from "./Input";

const EventModal = ({
    id,
    titleLabel,
    choosedEvent,
    eventChangeHandler,
    submitHandler,
    submitButtonLabel,
}) => {
    return (
        <>
            <div className="modal" tabIndex="-1" id={id}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{titleLabel}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2">
                                <div className="col">
                                    <Input
                                        name="title"
                                        label="事件标题"
                                        value={choosedEvent.title}
                                        onChange={eventChangeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col">
                                    <Input
                                        name="month"
                                        label="月"
                                        value={choosedEvent.month}
                                        onChange={eventChangeHandler}
                                    />
                                </div>
                                <div className="col">
                                    <Input
                                        name="date"
                                        label="日"
                                        value={choosedEvent.date}
                                        onChange={eventChangeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col">
                                    <Input
                                        name="startTime"
                                        label="开始时间"
                                        value={choosedEvent.startTime}
                                        onChange={eventChangeHandler}
                                    />
                                </div>
                                <div className="col">
                                    <Input
                                        name="endTime"
                                        label="结束时间"
                                        value={choosedEvent.endTime}
                                        onChange={eventChangeHandler}
                                    />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col">
                                    <Input
                                        name="description"
                                        label="事件描述"
                                        value={choosedEvent.description}
                                        onChange={eventChangeHandler}
                                    />
                                </div>
                            </div>
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
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                                onClick={submitHandler}
                            >
                                {submitButtonLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventModal;

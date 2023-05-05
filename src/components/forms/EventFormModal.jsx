import Input from "./Input";

const EventFormModal = ({ id, titleLabel, choosedEvent }) => {
    const { title, startTime, endTime, description } = choosedEvent;
    const eventStartDate = new Date(startTime);
    const month = eventStartDate.getMonth() + 1;
    const date = eventStartDate.getDate();
    const startHour = eventStartDate.getHours();
    const endHour = new Date(endTime).getHours();
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
                                        value={title}
                                    />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col">
                                    <Input
                                        name="month"
                                        label="月"
                                        value={month}
                                    />
                                </div>
                                <div className="col">
                                    <Input
                                        name="date"
                                        label="日"
                                        value={date}
                                    />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col">
                                    <Input
                                        name="startTime"
                                        label="开始时间"
                                        value={startHour}
                                    />
                                </div>
                                <div className="col">
                                    <Input
                                        name="endTime"
                                        label="结束时间"
                                        value={endHour}
                                    />
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col">
                                    <Input
                                        name="description"
                                        label="事件描述"
                                        value={description}
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
                            >
                                提交
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventFormModal;

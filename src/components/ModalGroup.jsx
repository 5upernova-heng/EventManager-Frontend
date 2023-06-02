import { useContext, useState, useEffect } from "react";
import Modal from "./Modal";
import EventForm from "./forms/EventForm";
import { EventContext } from "../context/EventContextProvider";

const ModelGroup = () => {
    const {
        events,
        choosedEvent,
        submitData,
        dataToEvent,
        addEvent,
        updateEvent,
        deleteEvent,
    } = useContext(EventContext);

    return (
        <>
            <Modal
                id="addEvent"
                size="lg"
                headerLabel="添加事件"
                bodyComponent={<EventForm id="add" />}
                footerComponent={
                    <>
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
                            onClick={() => {
                                const submitEvent = dataToEvent(submitData);
                                addEvent(submitEvent, submitData);
                            }}
                        >
                            添加
                        </button>
                    </>
                }
            />
            <Modal
                id="modifyEvent"
                size="lg"
                headerLabel="修改事件"
                bodyComponent={<EventForm id="modify" />}
                footerComponent={
                    <>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                        >
                            取消
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                deleteEvent(choosedEvent.id);
                            }}
                        >
                            删除
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                const newEvent = dataToEvent(submitData);
                                newEvent.id = choosedEvent.id;
                                updateEvent(newEvent, submitData);
                            }}
                        >
                            提交修改
                        </button>
                    </>
                }
            />
        </>
    );
};

export default ModelGroup;

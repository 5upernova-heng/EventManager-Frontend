import { useContext, useState, useEffect } from "react";
import EventModel from "./EventModel";
import EventForm from "./forms/EventForm";
import { EventContext } from "../pages/Calendar";

const ModelGroup = () => {
    const { events, choosedEvent, addEvent, updateEvent, deleteEvent } =
        useContext(EventContext);
    const { title, startTime, endTime, description, category } = choosedEvent;
    const eventStartDate = new Date(startTime);
    const month = eventStartDate.getMonth() + 1;
    const date = eventStartDate.getDate();
    const startHour = eventStartDate.getHours();
    const endHour = new Date(endTime).getHours();
    const [submitData, setSubmit] = useState({
        title,
        month,
        date,
        startHour,
        endHour,
        description,
        startTime,
        category,
    });

    useEffect(() => {
        const { title, startTime, endTime, description, category } =
            choosedEvent;
        const eventStartDate = new Date(startTime);
        const month = eventStartDate.getMonth() + 1;
        const date = eventStartDate.getDate();
        const startHour = eventStartDate.getHours();
        const endHour = new Date(endTime).getHours();
        setSubmit({
            title,
            month,
            date,
            startHour,
            endHour,
            description,
            startTime,
            category,
        });
    }, [choosedEvent]);

    const assignId = () => {
        return events[events.length - 1].id + 1;
    };

    const data2Event = () => {
        const {
            title,
            month,
            date,
            startHour,
            endHour,
            description,
            category,
        } = submitData;
        const newStartDate = new Date();
        newStartDate.setMonth(month - 1);
        newStartDate.setDate(date);
        newStartDate.setHours(startHour);
        const newEndDate = new Date(newStartDate);
        newEndDate.setHours(endHour);
        return {
            id: choosedEvent.id,
            startTime: newStartDate.getTime(),
            endTime: newEndDate.getTime(),
            title,
            category,
            description,
        };
    };

    return (
        <>
            <EventModel
                id="addEvent"
                headerLabel="添加事件"
                bodyComponent={
                    <EventForm
                        id="add"
                        submitData={submitData}
                        setSubmit={setSubmit}
                    />
                }
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
                                choosedEvent.id = assignId();
                                addEvent(choosedEvent);
                            }}
                        >
                            添加
                        </button>
                    </>
                }
            />
            <EventModel
                id="modifyEvent"
                headerLabel="修改事件"
                bodyComponent={
                    <EventForm
                        id="modify"
                        submitData={submitData}
                        setSubmit={setSubmit}
                    />
                }
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
                                updateEvent(data2Event());
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
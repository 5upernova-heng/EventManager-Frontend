import { useContext, useState, useEffect } from "react";
import EventModel from "./EventModel";
import EventForm from "./forms/EventForm";
import { EventContext } from "./calendar/weekcalendar/CalendarBody";

const ModelGroup = () => {
    const { choosedEvent } = useContext(EventContext);
    const { title, startTime, endTime, description } = choosedEvent;
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
    });
    useEffect(() => {
        const { title, startTime, endTime, description } = choosedEvent;
        const eventStartDate = new Date(startTime);
        const month = eventStartDate.getMonth() + 1;
        const date = eventStartDate.getDate();
        const startHour = eventStartDate.getHours();
        const endHour = new Date(endTime).getHours();
        setSubmit({ title, month, date, startHour, endHour, description });
    }, [choosedEvent]);
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
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
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

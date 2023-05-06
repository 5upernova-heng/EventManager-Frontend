import { useState } from "react";
import { getDateLimit } from "../../utils/calDate";
import Input from "./Input";
import Range from "./Range";

const EventForm = ({ id, submitData, setSubmit }) => {
    const { title, month, date, startHour, endHour, description, startTime } =
        submitData;
    const [startKey, setStartKey] = useState(`startHour-${startHour}`);
    const [endKey, setEndKey] = useState(`endHour-${endHour}`);
    const rangeKey = `${startTime}-${id}`;
    const changeData = (dataObject) => {
        const newData = structuredClone(submitData);
        for (const prop in dataObject) {
            newData[prop] = dataObject[prop];
        }
        setSubmit(newData);
    };
    return (
        <div className="mb-2">
            <Input
                name={`title-${id}`}
                label="事件标题"
                value={title}
                onChange={(event) => {
                    changeData({ title: event.target.value });
                }}
            />
            <div className="row">
                <div className="col">
                    <Range
                        id={`month-${id}`}
                        key={`month-${rangeKey}`}
                        label={`月: ${month}`}
                        value={month}
                        changeHandler={(event) => {
                            changeData({ month: event.target.value });
                        }}
                        rangeAttrs={{ min: 1, max: 12, step: 1 }}
                    />
                </div>
                <div className="col">
                    <Range
                        id={`date-${id}`}
                        key={`date-${rangeKey}`}
                        label={`日: ${date}`}
                        value={date}
                        changeHandler={(event) => {
                            changeData({ date: event.target.value });
                        }}
                        rangeAttrs={{
                            min: 1,
                            max: getDateLimit(month),
                            step: 1,
                        }}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Range
                        key={`${startKey}-${rangeKey}`}
                        id={`startTime-${id}`}
                        label={`开始时间: ${startHour}`}
                        value={startHour}
                        changeHandler={(event) => {
                            const newStartHour = Number(event.target.value);
                            if (newStartHour >= endHour) {
                                const newEndHour = newStartHour + 1;
                                changeData({
                                    startHour: newStartHour,
                                    endHour: newEndHour,
                                });
                                setEndKey(`endHour-${newEndHour}`);
                            } else {
                                changeData({ startHour: newStartHour });
                            }
                        }}
                        rangeAttrs={{ min: 0, max: 23, step: 1 }}
                    />
                </div>
                <div className="col">
                    <Range
                        key={`${endKey}-${rangeKey}`}
                        id={`endTime-${id}`}
                        label={`结束时间: ${endHour}`}
                        value={endHour}
                        changeHandler={(event) => {
                            const newEndHour = Number(event.target.value);
                            if (newEndHour <= startHour) {
                                const newStartHour = newEndHour - 1;
                                changeData({
                                    startHour: newEndHour - 1,
                                    endHour: newEndHour,
                                });
                                setStartKey(`startHour-${newStartHour}`);
                            } else {
                                changeData({ endHour: newEndHour });
                            }
                        }}
                        rangeAttrs={{ min: 0, max: 23, step: 1 }}
                    />
                </div>
            </div>
            <div>
                <Input
                    name="description"
                    label="事件描述"
                    value={description}
                    onChange={(event) => {
                        changeData({ description: event.target.value });
                    }}
                />
            </div>
        </div>
    );
};

export default EventForm;

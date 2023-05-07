import { useState } from "react";
import { getDateLimit } from "../../utils/calDate";
import Input from "./Input";
import Range from "./Range";
import SelectButtonGroup from "./SelectButtonGroup";
import TextArea from "./TextArea";

const EventForm = ({ id, submitData, setSubmit }) => {
    const {
        title,
        month,
        date,
        startHour,
        endHour,
        description,
        startTime,
        category,
    } = submitData;
    const [startKey, setStartKey] = useState(`startHour-${startHour}`);
    const [endKey, setEndKey] = useState(`endHour-${endHour}`);
    const rangeKey = `${startTime}-${id}`;
    const buttonStyle = [
        { label: "课程", style: "btn-outline-primary" },
        { label: "个人", style: "btn-outline-success" },
        { label: "团体", style: "btn-outline-info" },
    ];
    const categoryLabel = buttonStyle[category].label;

    const parseButtonInfo = () => {
        return buttonStyle.map((button, index) => {
            button.isActive = index == category;
            return button;
        });
    };
    const changeSelect = (category) => {
        changeData({ category });
    };
    const changeData = (dataObject) => {
        const newData = structuredClone(submitData);
        for (const prop in dataObject) {
            newData[prop] = dataObject[prop];
        }
        setSubmit(newData);
    };

    return (
        <div>
            <div className="mt-2">{`事件类型：${categoryLabel}`}</div>
            <div className="d-flex justify-content-center">
                <SelectButtonGroup
                    buttonsInfo={parseButtonInfo()}
                    changeSelect={changeSelect}
                />
            </div>
            <div className="mb-2">
                <Input
                    name={`title-${id}`}
                    label="事件标题"
                    value={title}
                    onChange={(event) => {
                        changeData({ title: event.target.value });
                    }}
                />
            </div>
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
            <TextArea
                name="description"
                label="事件描述"
                value={description}
                onChange={(event) => {
                    changeData({ description: event.target.value });
                }}
            />
        </div>
    );
};

export default EventForm;

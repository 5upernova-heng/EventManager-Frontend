import { useState } from "react";
import { getDateLimit } from "../../utils/calDate";
import Input from "./Input";
import Range from "./Range";
import SelectButtonGroup from "./SelectButtonGroup";
import TextArea from "./TextArea";
import CheckButtonGroup from "./CheckButtonGroup";

const EventForm = ({ id, submitData, setSubmit }) => {
    const {
        title,
        month,
        date,
        day,
        startHour,
        endHour,
        description,
        startTime,
        category,
        isOnce,
        isOfficial,
    } = submitData;
    const [startKey, setStartKey] = useState(`startHour-${startHour}`);
    const [endKey, setEndKey] = useState(`endHour-${endHour}`);
    const rangeKey = `${startTime}-${id}`;
    const categoryStyle = [
        { label: "个人", style: "btn-outline-warning" },
        { label: "团体", style: "btn-outline-success" },
        { label: "临时", style: "btn-outline-info" },
    ];
    const categoryLabel = categoryStyle[category].label;
    const timeStyle = [
        { label: "每周", style: "btn-outline-secondary" },
        { label: "单次", style: "btn-outline-secondary" },
    ];
    const intervalLabel = timeStyle[isOnce].label;
    const dayStyle = [
        { label: "周日", style: "btn-sm btn-outline-secondary" },
        { label: "周一", style: "btn-sm btn-outline-secondary" },
        { label: "周二", style: "btn-sm btn-outline-secondary" },
        { label: "周三", style: "btn-sm btn-outline-secondary" },
        { label: "周四", style: "btn-sm btn-outline-secondary" },
        { label: "周五", style: "btn-sm btn-outline-secondary" },
        { label: "周六", style: "btn-sm btn-outline-secondary" },
    ];

    const parseButtonInfo = (style, activeIndex) => {
        return style.map((button, index) => {
            button.isActive = index == activeIndex;
            return button;
        });
    };
    const changeCategory = (category) => {
        changeData({ category });
    };
    const changeInterval = (isOnce) => {
        changeData({ isOnce });
    };
    const changeDay = (day) => {
        changeData({ day });
    };
    const changeData = (dataObject) => {
        const newData = structuredClone(submitData);
        for (const prop in dataObject) {
            newData[prop] = dataObject[prop];
        }
        setSubmit(newData);
    };

    const renderBasicInfo = () => {
        return (
            <>
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
                <TextArea
                    name="description"
                    label="事件描述"
                    value={description}
                    onChange={(event) => {
                        changeData({ description: event.target.value });
                    }}
                />
            </>
        );
    };

    const renderCategoryInfo = () => {
        return (
            <>
                <div className="mt-2">{`事件类型：${categoryLabel}`}</div>
                <div className="d-flex justify-content-center">
                    <SelectButtonGroup
                        buttonsInfo={parseButtonInfo(categoryStyle, category)}
                        changeSelect={changeCategory}
                    />
                </div>
            </>
        );
    };

    const renderTimeInfo = () => {
        return (
            <>
                <div className="my-2">{`周期性：${intervalLabel}`}</div>
                <div className="d-flex justify-content-center align-items-center mb-2">
                    <SelectButtonGroup
                        buttonsInfo={parseButtonInfo(timeStyle, isOnce)}
                        changeSelect={changeInterval}
                    />
                    {isOnce ? (
                        <></>
                    ) : (
                        <div className="mx-2">
                            <SelectButtonGroup
                                buttonsInfo={parseButtonInfo(dayStyle, day)}
                                changeSelect={changeDay}
                            />
                        </div>
                    )}
                </div>
                {isOnce ? (
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
                ) : (
                    <div></div>
                )}
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
            </>
        );
    };

    return (
        <div>
            {renderBasicInfo()}
            <hr />
            {renderCategoryInfo()}
            <hr />
            {renderTimeInfo()}
        </div>
    );
};

export default EventForm;

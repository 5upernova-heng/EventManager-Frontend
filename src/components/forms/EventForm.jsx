import { useState, useContext } from "react";
import { getDateLimit, minutesToString } from "../../utils/calDate";
import Input from "./Input";
import Range from "./Range";
import SelectButtonGroup from "./SelectButtonGroup";
import { EventContext } from "../../context/EventContextProvider";
import { AuthContext } from "../../context/AuthContextProvider";

const EventForm = ({ id }) => {
    const { submitData, changeData } = useContext(EventContext);
    const {
        title,
        month,
        date,
        day,
        startMinute,
        endMinute,
        startTime,
        category,
        isOnce,
        isOfficial,
    } = submitData;
    // console.log(startMinute, endMinute);
    const [startKey, setStartKey] = useState(`start-${startMinute}`);
    const [endKey, setEndKey] = useState(`end-${endMinute}`);
    const rangeKey = `${startTime}-${id}`;

    const { officialColorSet, personalColorSet } = useContext(EventContext);
    const { auth } = useContext(AuthContext);
    const categoryStyle = [
        { label: "课外", style: `btn-outline-${personalColorSet[0]}` },
        { label: "课内", style: `btn-outline-${officialColorSet[0]}` },
    ];
    const officialCategory = [{ label: "课程" }, { label: "考试" }];
    const officialStyle = officialCategory.map((category, index) => {
        category.style = `btn-outline-${officialColorSet[index]}`;
        return category;
    });
    const personalCategory = [
        { label: "个人" },
        { label: "团体" },
        { label: "临时" },
    ];
    const personalStyle = personalCategory.map((category, index) => {
        category.style = `btn-outline-${personalColorSet[index]}`;
        return category;
    });

    const categoryLabel = isOfficial
        ? officialCategory[category].label
        : personalStyle[category].label;
    const timeStyle = [
        { label: "每周", style: "btn-outline-primary" },
        { label: "单次", style: "btn-outline-primary" },
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
    const changeOfficial = (isOfficial) => {
        if (isOfficial && category > 1) changeData({ isOfficial, category: 0 });
        else changeData({ isOfficial });
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

    const renderBasicInfo = () => {
        return (
            <>
                <div className="mb-2">
                    <Input
                        name={`title-${id}`}
                        label="事件标题"
                        value={title}
                        type="text"
                        onChange={(event) => {
                            changeData({ title: event.target.value });
                        }}
                    />
                    <div className="mt-2">{`当前地点：${categoryLabel}`}</div>
                    <button className="mt-2 btn btn-primary">当前地点</button>
                </div>
            </>
        );
    };

    const renderCategoryInfo = () => {
        return (
            <>
                <div className="mt-2">{`事件类型：${categoryLabel}`}</div>
                <div className="d-flex justify-content-evenly">
                    {auth ? (
                        <SelectButtonGroup
                            buttonsInfo={parseButtonInfo(
                                categoryStyle,
                                isOfficial
                            )}
                            changeSelect={changeOfficial}
                        />
                    ) : (
                        <></>
                    )}
                    <SelectButtonGroup
                        buttonsInfo={
                            isOfficial
                                ? parseButtonInfo(officialStyle, category)
                                : parseButtonInfo(personalStyle, category)
                        }
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
                <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                    <SelectButtonGroup
                        buttonsInfo={parseButtonInfo(timeStyle, isOnce)}
                        changeSelect={changeInterval}
                    />
                    {isOnce ? (
                        <></>
                    ) : (
                        <div className="my-3">
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
                                    changeData({
                                        month: event.target.value,
                                    });
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
                                    changeData({
                                        date: event.target.value,
                                    });
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
                <Range
                    key={`${startKey}-${rangeKey}`}
                    id={`startTime-${id}`}
                    label={`开始时间: ${minutesToString(startMinute)}`}
                    value={startMinute}
                    changeHandler={(event) => {
                        const newStartMinute = Number(event.target.value);
                        if (newStartMinute >= endMinute) {
                            const newEndMinute = newStartMinute + 1;
                            changeData({
                                startMinute: newStartMinute,
                                endMinute: newEndMinute,
                            });
                            setEndKey(`endMinute-${newEndMinute}`);
                        } else {
                            changeData({
                                startMinute: newStartMinute,
                            });
                        }
                    }}
                    rangeAttrs={{ min: 0, max: 288, step: 1 }}
                />
                <Range
                    key={`${endKey}-${rangeKey}`}
                    id={`endTime-${id}`}
                    label={`结束时间: ${minutesToString(endMinute)}`}
                    value={endMinute}
                    changeHandler={(event) => {
                        const newEndMinute = Number(event.target.value);
                        if (newEndMinute <= startMinute) {
                            const newStartMinute = newEndMinute - 1;
                            changeData({
                                startMinute: newEndMinute - 1,
                                endMinute: newEndMinute,
                            });
                            setStartKey(`startMinute-${newStartMinute}`);
                        } else {
                            changeData({
                                endMinute: newEndMinute,
                            });
                        }
                    }}
                    rangeAttrs={{ min: 0, max: 288, step: 1 }}
                />
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

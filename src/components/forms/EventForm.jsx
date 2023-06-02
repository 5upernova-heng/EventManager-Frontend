import { useState, useContext } from "react";
import { getDateLimit, minutesToString } from "../../utils/calDate";
import Input from "./Input";
import Range from "./Range";
import SelectButtonGroup from "./SelectButtonGroup";
import { EventContext } from "../../context/EventContextProvider";
import { LoginContext } from "../../context/LoginContextProvider";
import { MapContext } from "../../context/MapContextProvider";
import LocationSelector from "./LocationSelector";
import STYLE from "../../style";
import MemberSelector from "./MemberSelector";
import Switch from "./Switch";

const EventForm = ({ id }) => {
    const { submitData, changeData } = useContext(EventContext);
    const { getLocationName } = useContext(MapContext);
    const {
        title,
        month,
        date,
        day,
        startMinute,
        endMinute,
        startTime,
        category,
        doLoop,
        doRemind,
        location,
        owner,
        participants,
    } = submitData;
    // map node select

    const [startKey, setStartKey] = useState(`start-${startMinute}`);
    const [endKey, setEndKey] = useState(`end-${endMinute}`);
    const rangeKey = `${startTime}-${id}`;

    const { auth } = useContext(LoginContext);
    const categoryLabel = STYLE.getCategoryLabel(category);
    const intervalLabel = STYLE.getLoopLabel(doLoop);

    const changeStartMinute = (startMinute) => {
        //
        if (startMinute + 36 < endMinute) {
            changeData({
                startMinute,
                endMinute: startMinute + 36,
            });
            setEndKey(endMinute);
            return;
        }
        if (startMinute + 12 > endMinute) {
            changeData({
                startMinute,
                endMinute: startMinute + 12,
            });
            setEndKey(endMinute);
            return;
        }
        changeData({ startMinute });
    };
    const changeEndMinute = (endMinute) => {
        if (startMinute > endMinute - 12) {
            changeData({
                startMinute: endMinute - 12,
                endMinute,
            });
            setStartKey(startMinute);
            return;
        }
        if (startMinute < endMinute - 36) {
            changeData({
                startMinute: endMinute - 36,
                endMinute,
            });
            setStartKey(startMinute);
            return;
        }
        changeData({ endMinute });
    };
    const changeCategory = (category) => {
        changeData({ category });
    };
    const changeInterval = (doLoop) => {
        changeData({ doLoop });
    };
    const changeDay = (day) => {
        changeData({ day });
    };
    const changeLocation = (location) => {
        changeData({ location });
    };
    const toggleMember = (id) => {
        if (participants.includes(id)) {
            const index = participants.indexOf(id);
            participants.splice(index, 1);
        } else {
            participants.push(id);
        }
        changeData({ participants });
    };
    const toggleRemind = () => {
        const prev = submitData.doRemind;
        changeData({ doRemind: !prev });
    };
    const isGroupEvent = () => {
        return category > 1;
    };

    /**Render according to the auth level */
    const renderCategoryButton = () => {
        return STYLE.categoryStyle
            .filter((_, index) => {
                return !(auth === 0 && index < 2) && id !== "modify";
            })
            .map((category) => {
                return category;
            });
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
                    <div className="mt-2">
                        <p className="mb-0">{`事件地点：${getLocationName(
                            location
                        )}`}</p>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <button
                            className="btn btn-outline-dark ms-5"
                            data-bs-toggle="collapse"
                            data-bs-target="#mapCollapse"
                        >
                            <i
                                className="fa fa-map-marker"
                                aria-hidden="true"
                            ></i>
                        </button>
                        <button className="d-flex align-items-center btn btn-primary">
                            <p className="mb-0 pe-2">查看导航</p>
                            <i
                                className="fa fa-location-arrow"
                                aria-hidden="true"
                            ></i>
                        </button>
                    </div>
                </div>
            </>
        );
    };

    const renderRemindInfo = () => {
        const id = "event-remind";
        return (
            <div className="mt-2 d-flex justify-content-between align-items-center">
                <label className="mb-0 flex-grow-1" htmlFor={id}>
                    是否提醒
                </label>
                <Switch
                    id={id}
                    isOn={doRemind}
                    size="md"
                    toggleHandler={toggleRemind}
                />
            </div>
        );
    };

    const renderCategoryInfo = () => {
        return (
            <>
                <div className="mt-2">{`事件类型：${categoryLabel}`}</div>
                <div className="d-flex justify-content-evenly my-2">
                    <SelectButtonGroup
                        buttonsInfo={STYLE.parseButtonInfo(
                            renderCategoryButton(),
                            category
                        )}
                        changeSelect={changeCategory}
                    />
                </div>
                <p className="fs-6 mb-1">{`创建者：${owner}`}</p>
                {isGroupEvent() && (
                    <>
                        <p className="fs-6 mb-1">参与者</p>
                        <MemberSelector
                            members={participants}
                            toggleMember={toggleMember}
                        />
                    </>
                )}
            </>
        );
    };

    const renderTimeInfo = () => {
        return (
            <>
                <div className="my-2">{`周期性：${intervalLabel}`}</div>
                <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                    <SelectButtonGroup
                        buttonsInfo={STYLE.parseButtonInfo(
                            STYLE.timeStyle,
                            doLoop
                        )}
                        changeSelect={changeInterval}
                    />
                    {doLoop != 0 ? (
                        <></>
                    ) : (
                        <div className="my-3">
                            <SelectButtonGroup
                                buttonsInfo={STYLE.parseButtonInfo(
                                    STYLE.dayStyle,
                                    day
                                )}
                                changeSelect={changeDay}
                            />
                        </div>
                    )}
                </div>
                {doLoop == 2 ? (
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
                        changeStartMinute(newStartMinute);
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
                        changeEndMinute(newEndMinute);
                    }}
                    rangeAttrs={{ min: 0, max: 288, step: 1 }}
                />
            </>
        );
    };

    return (
        <div className="d-flex">
            <div
                style={{
                    width: "100%",
                }}
            >
                {renderBasicInfo()}
                <hr />
                {renderRemindInfo()}
                <hr />
                {renderCategoryInfo()}
                <hr />
                {renderTimeInfo()}
            </div>
            <div
                className="collapse collapse-horizontal border rounded ms-3"
                style={{
                    maxHeight: "41rem",
                    overflow: "auto",
                }}
                id="mapCollapse"
            >
                <LocationSelector
                    selected={location}
                    changeLocation={changeLocation}
                />
            </div>
        </div>
    );
};

export default EventForm;

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
import { toast } from "react-toastify";

const EventForm = ({ id }) => {
    const { submitData, changeData, eventToNav } = useContext(EventContext);
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
        locationId,
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

    /**up and down limit of a days' event */
    const upLimit = category < 3 ? 6 : 8;
    const downLimit = category < 3 ? 21 : 19;
    const duration = category < 3 ? 1 : 3;

    const renderStartRangeLabel = () => {
        return category < 3
            ? `${minutesToString(startMinute)} -- ${minutesToString(endMinute)}`
            : `开始时间: ${minutesToString(startMinute)}`;
    };

    const changeStartMinute = (startMinute) => {
        //
        if (startMinute + duration * 12 < endMinute) {
            changeData({
                startMinute,
                endMinute: startMinute + duration * 12,
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
        if (startMinute < endMinute - duration * 12) {
            changeData({
                startMinute: endMinute - duration * 12,
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
    const changeLocation = (locationId) => {
        changeData({ locationId });
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

    const renderDoLoopButton = () => {
        return STYLE.parseButtonInfo(STYLE.timeStyle, doLoop).filter(
            (_, index) => category > 0 || index === 0
        );
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
                            locationId
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
                        <button
                            className="d-flex align-items-center btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={async () => {
                                console.log(locationId);
                                if (locationId === -1)
                                    toast("您还没有选择地点");
                                else {
                                    await eventToNav(locationId);
                                }
                            }}
                        >
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
                    isOn={doRemind || category > 2}
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
                        buttonsInfo={renderDoLoopButton()}
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
                {doLoop == 0 ? (
                    <div className="row">
                        <div className="col">
                            <Range
                                id={`month-${id}`}
                                key={`month-${rangeKey}`}
                                label={`月: ${parseInt(month) + 1}`}
                                value={month}
                                changeHandler={(event) => {
                                    changeData({
                                        month: event.target.value,
                                    });
                                }}
                                rangeAttrs={{ min: 0, max: 11, step: 1 }}
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
                    label={renderStartRangeLabel()}
                    value={startMinute}
                    changeHandler={(event) => {
                        const newStartMinute = Number(event.target.value);
                        changeStartMinute(newStartMinute);
                    }}
                    rangeAttrs={{
                        min: upLimit * 12,
                        max: downLimit * 12,
                        step: 1,
                    }}
                />
                {category > 2 && (
                    <Range
                        key={`${endKey}-${rangeKey}`}
                        id={`endTime-${id}`}
                        label={`结束时间: ${minutesToString(endMinute)}`}
                        value={endMinute}
                        changeHandler={(event) => {
                            const newEndMinute = Number(event.target.value);
                            changeEndMinute(newEndMinute);
                        }}
                        rangeAttrs={{
                            min: upLimit * 12,
                            max: downLimit * 12,
                            step: 1,
                        }}
                    />
                )}
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
                    selected={locationId}
                    changeLocation={changeLocation}
                />
            </div>
        </div>
    );
};

export default EventForm;

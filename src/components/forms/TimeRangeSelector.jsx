import React from "react";
import PropTypes from "prop-types";
import { getDateLimit, monthList, minutesToString } from "../../utils/calDate";
import Range from "../forms/Range";

function TimeRangeSelector({
    id,
    startMinute,
    endMinute,
    startMonth,
    startDate,
    endMonth,
    endDate,
    changeData,
}) {
    const changeStartMinute = (startMinute) => {
        changeData({ startMinute });
    };
    const changeEndMinute = (endMinute) => {
        changeData({ endMinute });
    };
    const renderMonthSelect = (id, label, month, setMonth) => {
        return (
            <div>
                <label className="text-center mb-0" htmlFor={id}>
                    {label}
                </label>
                <select
                    className="form-select-sm"
                    id={id}
                    value={month}
                    onChange={(e) => {
                        setMonth(parseInt(e.currentTarget.value));
                    }}
                >
                    {monthList.map((monthLabel, index) => {
                        return (
                            <option key={index} value={index}>
                                {monthLabel}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    };
    const renderDateSelect = (id, label, month, date, setDate) => {
        const dateLimit = getDateLimit(month);
        const dateLabels = [];
        for (let i = 1; i <= dateLimit; i++) dateLabels.push(i);
        return (
            <div>
                <label
                    className="text-center mb-0"
                    htmlFor={id}
                    value={date}
                    onChange={(e) => {
                        setDate(parseInt(e.currentTarget.value));
                    }}
                >
                    {label}
                </label>
                <select className="form-select-sm" id={id}>
                    {dateLabels.map((dateLabel, index) => {
                        return (
                            <option key={index} value={index}>
                                {dateLabel}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    };

    return (
        <div>
            <div className="row">
                <div className="col">
                    <div className="d-flex justify-content-evenly">
                        {renderMonthSelect(
                            "startMonthSelect",
                            "开始月份",
                            startMonth,
                            (month) => {
                                changeData({ startMonth: month });
                            }
                        )}
                        {renderDateSelect(
                            "startDateSelect",
                            "开始日期",
                            startMonth,
                            startDate,
                            (date) => {
                                changeData({ startDate: date });
                            }
                        )}
                    </div>
                    <Range
                        id={`startTime-${id}`}
                        label={`开始时间: ${minutesToString(startMinute)}`}
                        value={startMinute}
                        changeHandler={(event) => {
                            const newStartMinute = Number(event.target.value);
                            changeStartMinute(newStartMinute);
                        }}
                        rangeAttrs={{ min: 0, max: 288, step: 1 }}
                    />
                </div>
                <div className="col">
                    <div className="d-flex justify-content-evenly">
                        {renderMonthSelect(
                            "endMonthSelect",
                            "结束月份",
                            endMonth,
                            (month) => {
                                changeData({ endMonth: month });
                            }
                        )}
                        {renderDateSelect(
                            "endDateSelect",
                            "结束日期",
                            endMonth,
                            endDate,
                            (date) => {
                                changeData({ endDate: date });
                            }
                        )}
                    </div>
                    <Range
                        id={`endTime-${id}`}
                        label={`结束时间: ${minutesToString(endMinute)}`}
                        value={endMinute}
                        changeHandler={(event) => {
                            const newEndMinute = Number(event.target.value);
                            changeEndMinute(newEndMinute);
                        }}
                        rangeAttrs={{ min: 0, max: 288, step: 1 }}
                    />
                </div>
            </div>
        </div>
    );
}

TimeRangeSelector.propTypes = {
    id: PropTypes.string.isRequired,
    startTime: PropTypes.number.isRequired,
    startMinute: PropTypes.number.isRequired,
    endMinute: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    changeData: PropTypes.func.isRequired,
};

export default TimeRangeSelector;

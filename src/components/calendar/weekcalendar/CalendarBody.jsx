import React, { Component } from "react";
import { getWeekDates } from "../../../utils/calDate";

import CalendarTimeColumn from "./CalendarTimeColumn";
import CalendarDateColumn from "./CalendarDateColumn";
import EventModal from "../../EventModal";

class CalendarBody extends Component {
    constructor(props) {
        super(props);
        const { events } = this.props;
        const newDistrube = [[], [], [], [], [], [], []];
        events.map((event) => {
            newDistrube[event.day].push(event);
        });
        this.state = {
            distributedEvents: newDistrube,
            choosedEvent: newDistrube[0][0],
        };
    }
    render() {
        const { date, events } = this.props;
        const { distributedEvents, choosedEvent } = this.state;
        const distribute = () => {
            // distribute events at this week to an array
            // this will be called when events changed
            const newDistrube = [[], [], [], [], [], [], []];
            events.map((event) => {
                newDistrube[event.day].push(event);
            });
            this.setState({ distributedEvents: newDistrube });
        };
        const eventChangeHandler = (e) => {
            const newEvent = { ...choosedEvent };
            const { name, value } = e.currentTarget;
            newEvent[name] = value;
            this.setState({ choosedEvent: newEvent });
        };
        const dates = getWeekDates(date);
        const createColumn = () => {
            return dates.map((d, index) => (
                <div className="col p-0" key={index}>
                    <CalendarDateColumn
                        events={distributedEvents[index]}
                        cellClickHandler={(row) => {
                            this.setState({
                                choosedEvent: {
                                    title: "",
                                    startTime: row,
                                    endTime: row + 1,
                                    date: dates[index].getDate(),
                                    month: dates[index].getMonth(),
                                    day: index,
                                    description: "",
                                },
                            });
                        }}
                        eventClickHandler={(event) => {
                            this.setState({ choosedEvent: event });
                        }}
                    />
                </div>
            ));
        };
        return (
            <>
                <div
                    style={{ maxHeight: "600px" }}
                    className="row overflow-auto border"
                >
                    <div className="col-1 p-0">
                        <CalendarTimeColumn />
                    </div>
                    {createColumn()}
                </div>
                <EventModal
                    id="addEvent"
                    titleLabel="添加事件"
                    choosedEvent={choosedEvent}
                    eventChangeHandler={eventChangeHandler}
                    submitButtonLabel="提交添加"
                />
                <EventModal
                    id="modifyEvent"
                    titleLabel="修改事件"
                    choosedEvent={choosedEvent}
                    eventChangeHandler={eventChangeHandler}
                    submitButtonLabel="提交修改"
                />
            </>
        );
    }
}
export default CalendarBody;

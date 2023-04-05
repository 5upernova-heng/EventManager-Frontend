import CalendarTimeColumn from "./CalendarTimeColumn";
import CalendarDateColumn from "./CalendarDateColumn";
import React, { Component } from "react";
import { getWeekDates, dateDiff } from "../../../utils/calDate";

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
        };
    }

    render() {
        const { date, events } = this.props;
        const distribute = () => {
            // distribute events at this week to an array
            // while each array is an array of event
            const newDistrube = [[], [], [], [], [], [], []];
            events.map((event) => {
                newDistrube[event.day].push(event);
            });
            this.setState({ distributedEvents: newDistrube });
        };
        const createColumn = () => {
            const dates = getWeekDates(date);
            return dates.map((d, index) => (
                <div className="col p-0" key={index}>
                    <CalendarDateColumn
                        events={this.state.distributedEvents[index]}
                    />
                </div>
            ));
        };
        return (
            <>
                <div
                    style={{ maxHeight: "450px" }}
                    className="row overflow-auto border"
                >
                    <div className="col-1 p-0">
                        <CalendarTimeColumn />
                    </div>
                    {createColumn()}
                </div>
            </>
        );
    }
}
export default CalendarBody;

import React, { Component } from "react";
import { getWeekDates } from "../../../utils/calDate";

import CalendarTimeColumn from "./CalendarTimeColumn";
import CalendarDateColumn from "./CalendarDateColumn";
import AddEvent from "../../modals/AddEvent";
import ModifyEvent from "../../modals/ModifyEvent";

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
            choosedCell: { col: 0, row: 0 },
            choosedEvent: newDistrube[0][0],
        };
    }
    render() {
        const { date, events } = this.props;
        const { distributedEvents, choosedCell, choosedEvent } = this.state;
        const distribute = () => {
            // distribute events at this week to an array
            // this will be called when events changed
            const newDistrube = [[], [], [], [], [], [], []];
            events.map((event) => {
                newDistrube[event.day].push(event);
            });
            this.setState({ distributedEvents: newDistrube });
        };
        const cellClickHandler = () => {};
        const createColumn = () => {
            const dates = getWeekDates(date);
            return dates.map((d, index) => (
                <div className="col p-0" key={index}>
                    <CalendarDateColumn
                        events={distributedEvents[index]}
                        cellClickHandler={(row) => {
                            this.setState({ choosedCell: { row, col: index } });
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
                <AddEvent choosedCell={choosedCell} />
                <ModifyEvent choosedEvent={choosedEvent} />
            </>
        );
    }
}
export default CalendarBody;

import { useState } from "react";
import Input from "./Input";
import Range from "./Range";

const EventForm = ({ id, choosedEvent }) => {
    return (
        <div className="mb-2">
            <Input
                name="title"
                label="事件标题"
                value={"Hello"}
                onChange={() => {}}
            />
            <div className="d-flex">
                <Range
                    id={`month-${id}`}
                    label={`月: ${0}`}
                    value={5}
                    changeHandler={() => {}}
                    rangeAttrs={{ min: 1, max: 12, step: 1 }}
                />
                <Range
                    id={`date-${id}`}
                    label={`日: ${0}`}
                    value={6}
                    changeHandler={() => {}}
                    rangeAttrs={{ min: 1, max: 12, step: 1 }}
                />
            </div>
        </div>
    );
};

export default EventForm;

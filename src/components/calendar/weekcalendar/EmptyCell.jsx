import { useContext, useState } from "react";
import { EventContext } from "../../../context/EventContextProvider";

const EmptyCell = ({ row, col }) => {
    const [hover, setHover] = useState(false);
    const renderStyle = () => {
        return hover ? "p-5 border bg-light" : "p-5 border";
    };
    const { setCellEvent } = useContext(EventContext);
    return (
        <div
            className={renderStyle()}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            onClick={() => {
                setCellEvent(row, col);
            }}
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addEvent"
        ></div>
    );
};

export default EmptyCell;

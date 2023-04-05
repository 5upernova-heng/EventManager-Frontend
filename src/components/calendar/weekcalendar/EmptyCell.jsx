import { useState } from "react";

const EmptyCell = ({ clickHandler }) => {
    const [hover, setHover] = useState(false);
    const renderStyle = () => {
        return hover ? "p-4 border bg-light" : "p-4 border";
    };
    return (
        <div
            className={renderStyle()}
            onMouseEnter={() => {
                setHover(true);
            }}
            onMouseLeave={() => {
                setHover(false);
            }}
            onClick={clickHandler}
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#addEvent"
        ></div>
    );
};

export default EmptyCell;

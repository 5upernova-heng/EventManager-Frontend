import { useState } from "react";

const EmptyCell = () => {
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
        ></div>
    );
};

export default EmptyCell;

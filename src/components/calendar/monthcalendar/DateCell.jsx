import PropTypes from "prop-types";

const DateCell = ({ date, currentDate }) => {
    const renderClass = () => {
        const grey =
            date.getMonth() === currentDate.getMonth()
                ? ""
                : "text-secondary opacity-50";
        const badge =
            date.getDate() === currentDate.getDate() &&
            date.getMonth() === currentDate.getMonth()
                ? "bg-primary rounded rounded-3 text-white"
                : "";
        return `p-1 ${grey} ${badge}`;
    };
    return (
        <>
            <span className={renderClass()}>
                <p className="mb-0">{`${date.getDate()}`.padStart(2, "0")}</p>
            </span>
        </>
    );
};

DateCell.propTypes = {
    date: PropTypes.instanceOf(Date),
    currentDate: PropTypes.instanceOf(Date),
};

export default DateCell;

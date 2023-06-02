import PropTypes from "prop-types";
import "/src/styles/DateCell.css";

const DateCell = ({ date, setDate, currentDate }) => {
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
        return `date-cell p-1 ${grey} ${badge}`;
    };
    return (
        <>
            <span
                className={renderClass()}
                onClick={() => {
                    setDate(date);
                }}
            >
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

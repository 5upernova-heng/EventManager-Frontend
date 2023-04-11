const DateCell = ({ date, currentDate }) => {
    const renderClass = () => {
        const grey =
            date.getMonth() === currentDate.getMonth() ? "" : "text-secondary";
        const badge =
            date.getDate() === currentDate.getDate()
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

export default DateCell;

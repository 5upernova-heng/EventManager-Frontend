const CheckButtonGroup = ({ interval, changeInterval }) => {
    const { days } = interval;
    const toggleDayCheck = (index) => {
        days[index] = !days[index];
        interval.days = days;
        if (days.every((day) => day)) interval.type = 1;
        else interval.type = 0;
        changeInterval(interval);
    };
    const renderButtons = () => {
        const dayLabels = [
            "周日",
            "周一",
            "周二",
            "周三",
            "周四",
            "周五",
            "周六",
        ];
        return dayLabels.map((label, index) => (
            <button
                key={index}
                type="button"
                className={`btn btn-light ${days[index] ? "active" : ""}`}
                onClick={() => toggleDayCheck(index)}
            >
                {label}
            </button>
        ));
    };
    return (
        <div className="btn-group" role="group">
            {renderButtons()}
        </div>
    );
};

export default CheckButtonGroup;

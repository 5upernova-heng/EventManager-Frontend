const SelectButtonGroup = ({ buttonsInfo, changeSelect }) => {
    const renderButtons = () => {
        return buttonsInfo.map((button, index) => {
            return (
                <button
                    key={index}
                    onClick={() => changeSelect(index)}
                    className={`btn ${button.style} ${
                        button.isActive ? "active" : ""
                    }`}
                    type="button"
                >
                    {button.label}
                </button>
            );
        });
    };
    return (
        <div className="btn-group" role="group">
            {renderButtons()}
        </div>
    );
};

export default SelectButtonGroup;

import "../styles/switch.css";
const Switch = ({ id, isOn, toggleHandler, size }) => {
    return (
        <div className={`mb-1 form-check form-switch form-switch-${size}`}>
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={id}
                checked={isOn}
                onChange={toggleHandler}
            />
        </div>
    );
};

export default Switch;

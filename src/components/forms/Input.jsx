const Input = ({ name, label, styleClass, value, onChange, error }) => {
    return (
        <>
            <label className="form-group mb-1" htmlFor={name}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                type="text"
                className={`form-control ${styleClass}`}
                value={value}
                onChange={onChange}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </>
    );
};

export default Input;

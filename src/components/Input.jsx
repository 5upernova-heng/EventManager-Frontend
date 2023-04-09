const Input = ({ name, label, value, onChange, error }) => {
    return (
        <>
            <label className="form-group" htmlFor={name}>
                {label}
            </label>
            <input
                id={name}
                name={name}
                type="text"
                className="form-control"
                value={value}
                onChange={onChange}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </>
    );
};

export default Input;

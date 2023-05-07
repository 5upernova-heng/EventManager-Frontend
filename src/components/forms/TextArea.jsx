const TextArea = ({ name, label, value, onChange }) => {
    return (
        <div className="form-floating">
            <textarea
                className="form-control"
                style={{ height: "100px" }}
                id={name}
                value={value}
                onChange={onChange}
            ></textarea>
            <label htmlFor={name}>{label}</label>
        </div>
    );
};

export default TextArea;

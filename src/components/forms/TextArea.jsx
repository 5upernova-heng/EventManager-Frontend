const TextArea = ({ name, label, value, onChange }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            <textarea
                className="form-control"
                style={{ height: "100px" }}
                id={name}
                value={value}
                onChange={onChange}
            ></textarea>
        </div>
    );
};

export default TextArea;

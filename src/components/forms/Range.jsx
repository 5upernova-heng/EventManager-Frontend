const Range = ({ id, label, value, changeHandler, rangeAttrs }) => {
    const rangeId = `label-${id}`;
    return (
        <div>
            <label className="form-label" htmlFor={rangeId}>
                {label}
            </label>
            <input
                id={rangeId}
                type="range"
                {...rangeAttrs}
                className="form-range"
                defaultValue={value}
                onChange={(event) => {
                    changeHandler(event);
                }}
            />
        </div>
    );
};

export default Range;

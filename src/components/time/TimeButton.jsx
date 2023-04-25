const TimeButton = ({ clickHandler, tick, sync }) => {
    return (
        <button
            type="button"
            onClick={clickHandler}
            className="btn btn-sm mx-2 btn-outline-dark"
        >
            {tick || sync ? (
                <i className="fa fa-pause" aria-hidden="true"></i>
            ) : (
                <i className="fa fa-play" aria-hidden="true"></i>
            )}
        </button>
    );
};

export default TimeButton;

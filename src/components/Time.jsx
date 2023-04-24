function getDateString(date) {
    return `
    ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
    ${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
}
const Time = ({ date, clickHandler, tick, sync }) => {
    return (
        <>
            <p className="fs-3 mb-0 mx-2 text-center">{getDateString(date)}</p>
            <div
                className="btn-group btn-group-sm mx-2"
                role="group"
                aria-label="Basic outlined example"
            >
                <button
                    type="button"
                    onClick={clickHandler}
                    className="btn btn-outline-dark"
                >
                    {tick || sync ? (
                        <i className="fa fa-pause" aria-hidden="true"></i>
                    ) : (
                        <i className="fa fa-play" aria-hidden="true"></i>
                    )}
                </button>
            </div>
        </>
    );
};

export default Time;

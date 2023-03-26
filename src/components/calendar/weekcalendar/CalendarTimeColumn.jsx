// The first column of date, showing the time stamp

function createCells() {
    // set border to time cells is to make should the horizontal alignment with date cells
    const cells = [];
    for (let i = 0; i < 24; i++) {
        cells.push(
            <div
                key={i}
                className="p-4 position-relative border-top border-bottom border-black"
            >
                <div className="position-absolute top-0 start-50 translate-middle">
                    <p className="mb-0 fs-6 bg-white px-4 text-secondary">
                        {i === 0 || `${String(i).padStart(2, "0")}:00`}
                    </p>
                </div>
            </div>
        );
    }
    return cells;
}

const CalendarTimeColumn = () => {
    return (
        <div className="d-flex flex-wrap flex-column align-items-stretch justify-content-center">
            {createCells()}
        </div>
    );
};

export default CalendarTimeColumn;

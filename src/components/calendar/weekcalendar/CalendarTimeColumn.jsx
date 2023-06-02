// The first column of date, showing the time stamp

function createCells() {
    // set border to time cells is to make should the horizontal alignment with date cells
    const cells = [];
    for (let i = 6; i < 22; i++) {
        cells.push(
            <div
                key={i}
                className="p-5 position-relative border-top border-bottom border-opacity-0"
            >
                <div className="position-absolute top-0 start-50 translate-middle border rounded rounded-pill bg-white">
                    <p className="mb-0 fs-6 px-4 text-secondary">
                        {i === 6 || `${String(i).padStart(2, "0")}:00`}
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

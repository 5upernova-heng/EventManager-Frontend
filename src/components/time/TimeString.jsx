function getDateString(date) {
    return `
    ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
    ${String(date.getHours()).padStart(2, "0")}:${String(
        date.getMinutes()
    ).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`;
}
const TimeString = ({ date }) => {
    return <p className="fs-3 mb-0 mx-2 text-center">{getDateString(date)}</p>;
};

export default TimeString;

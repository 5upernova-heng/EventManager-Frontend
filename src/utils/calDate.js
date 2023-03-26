export function getWeekDates(date) {
    // get the date of this week, returns an array of date
    // to avoid affect the param, we need to create a new object.
    const d = new Date(date);
    d.setDate(d.getDate() - d.getDay());
    const dates = [];
    for (let i = 0; i < 7; i++) {
        dates.push(new Date(d));
        d.setDate(d.getDate() + 1);
    }
    return dates;
}

export function dateDiff(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

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

export const getDateString = (fullYear, month, date) => {
    return `${fullYear}/${month + 1}/${date}`;
};
export const getTimeString = (hour, minute, second) => {
    const hourStr = String(hour).padStart(2, "0");
    const minuteStr = String(minute).padStart(2, "0");
    const secondStr = String(second).padStart(2, "0");
    return second
        ? `${hourStr}:${minuteStr}:${secondStr}`
        : `${hourStr}:${minuteStr}`;
};
export const getDayString = (dayNum) => {
    const dayString = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return dayString[dayNum];
};

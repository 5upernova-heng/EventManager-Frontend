export const monthList = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
];
export const dayString = [
    "周日",
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六",
];
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

/**Different date between two date */
export function dateDiff(date1, date2) {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export const getDateString = (fullYear, month, date) => {
    return `${fullYear}/${month + 1}/${date}`;
};
export const getTimeString = (hour, minute, second) => {
    const hourStr = String(hour).padStart(2, "0");
    const minuteStr = String(minute).padStart(2, "0");
    const secondStr = String(second).padStart(2, "0");
    return second !== undefined
        ? `${hourStr}:${minuteStr}:${secondStr}`
        : `${hourStr}:${minuteStr}`;
};

/**Return the day of a week*/
export const getDayString = (dayNum) => {
    return dayString[dayNum];
};

export const stampToDay = (timestamp) => {
    const date = new Date(timestamp);
    return dayString[date.getDay()];
};

export const getDaysString = (days) => {
    const dayString = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    return days.every((day) => day)
        ? "每天"
        : days.reduce(
              (string, day, index) =>
                  day ? `${string} ${dayString[index]}` : string,
              ""
          );
};

export const getDateLimit = (month) => {
    // get the max date of this month (this year by default)
    const date = new Date();
    date.setMonth(month, 0);
    return date.getDate();
};

export const getGreetings = (hour) => {
    if (6 < hour && hour <= 8) return "早上好";
    if (8 < hour && hour <= 12) return "上午好";
    if (12 < hour && hour <= 14) return "中午好";
    if (14 < hour && hour <= 18) return "下午好";
    return "晚上好";
};

/** return the number of 5 minutes passed from today */
export const stampTo5Minutes = (timestamp) => {
    const date = new Date(timestamp);
    const hour = date.getHours();
    const minute = date.getMinutes();
    return Math.floor(hour * 12 + minute / 5);
};

export const stampToString = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth();
    const d = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    return `${getDateString(year, month, d)} ${getTimeString(hour, minute)}`;
};

export const minutesToDate = (minutes) => {
    minutes *= 5;
    const date = new Date();
    const hour = Math.floor(minutes / 60);
    const min = minutes % 60;
    date.setHours(hour);
    date.setMinutes(min);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
};

export const minutesToStamp = (minutes) => {
    return minutesToDate(minutes).getTime();
};

/** convert minutes to string */
export const minutesToString = (minutes) => {
    const date = minutesToDate(minutes);
    const hour = date.getHours();
    const min = date.getMinutes();
    return getTimeString(hour, min);
};

/**Start from now, cal the date of the end of the next day
 * Used in coming date fetching.
 */
export const getNextDayEndStamp = (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 2);
    nextDay.setHours(0);
    nextDay.setMinutes(0);
    nextDay.setSeconds(0);
    return nextDay.getTime();
};

const colorSet = ["primary", "danger", "success", "info", "secondary"];
// label
// category should be two characters long
const categoryLabel = ["课程", "考试", "个人", "团体", "临时"];
const dayLabel = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const timeLabel = ["每周", "每日", "单次"];

const getCategoryLabel = (category) => {
    return categoryLabel[category];
};

const getLoopLabel = (doLoop) => {
    return timeLabel[doLoop];
};
// style
const categoryStyle = categoryLabel.map((label, index) => {
    return { label, style: `btn-outline-${colorSet[index]}` };
});
const timeStyle = timeLabel.map((label) => {
    return { label, style: "btn-outline-primary" };
});
const dayStyle = dayLabel.map((label) => {
    return { label, style: `btn-sm btn-outline-secondary` };
});

const getCategoryColor = (category) => {
    return colorSet[category];
};

export default {
    // color
    colorSet,
    getCategoryColor,
    // label
    dayLabel,
    timeLabel,
    categoryLabel,
    getCategoryLabel,
    getLoopLabel,
    // style
    dayStyle,
    timeStyle,
    categoryStyle,
};

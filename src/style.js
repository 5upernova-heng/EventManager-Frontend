const colorSet = ["primary", "danger", "success", "info", "secondary"];
// label
const categoryLabel = ["课程", "考试", "个人事件", "团体事件", "临时事务"];
const dayLabel = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const timeLabel = ["每周", "单次"];
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
const getCategoryLabel = (category) => {
    return categoryLabel[category];
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
    // style
    dayStyle,
    timeStyle,
    categoryStyle,
};

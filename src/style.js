const colorSet = ["primary", "danger", "success", "info", "secondary"];
// label
// category should be two characters long
const categoryLabel = ["课程", "考试", "个人", "团体", "临时"];
const dayLabel = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const timeLabel = ["每周", "每日", "单次"];
const viewLabel = ["非临时事件", "临时事件"];

const getCategoryLabel = (category) => {
    return categoryLabel[category];
};

const getLoopLabel = (doLoop) => {
    return timeLabel[doLoop];
};

const getViewLabel = (view) => {
    return viewLabel[view];
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
const viewStyle = viewLabel.map((label) => {
    return { label, style: `btn btn-outline-secondary` };
});
const getCategoryColor = (category) => {
    return colorSet[category];
};

const parseButtonInfo = (style, activeIndex) => {
    return style.map((button, index) => {
        button.isActive = index == activeIndex;
        return button;
    });
};
export default {
    // color
    colorSet,
    getCategoryColor,
    // label
    dayLabel,
    timeLabel,
    categoryLabel,
    viewLabel,
    getCategoryLabel,
    getLoopLabel,
    getViewLabel,
    // style
    dayStyle,
    timeStyle,
    categoryStyle,
    viewStyle,
    // utils
    parseButtonInfo,
};

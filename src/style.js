const colorSet = ["primary", "danger", "success", "info", "secondary"];
const modeColorSet = ["primary", "warning"];
// label
// category should be two characters long
const categoryLabel = ["课程", "考试", "个人", "团体", "临时"];
const dayLabel = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
const timeLabel = ["每周", "每日", "单次"];
const viewLabel = ["非临时事件", "临时事件", "搜索"];
const authLabel = ["学生", "教师", "管理员"];
const mapModeLabel = ["单点寻路", "多点寻路"];
const keywordLabel = ["标题", "地点", "参与者"];
const searchModeLabel = ["搜索结果取交集", "搜索结果取并集"];
const modePrompt = ["请选择起始地和目的地", "请添加途径节点（无序）"];

const getCategoryLabel = (category) => {
    return categoryLabel[category];
};

const getLoopLabel = (doLoop) => {
    return timeLabel[doLoop];
};

const getViewLabel = (view) => {
    return viewLabel[view];
};

const getMapModeLabel = (mode) => mapModeLabel[mode];
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
const mapModeStyle = mapModeLabel.map((label, index) => ({
    label,
    style: `btn btn-lg btn-outline-${modeColorSet[index]}`,
}));
const authStyle = authLabel.map((label) => {
    return { label, style: `btn-sm btn-outline-secondary` };
});
const searchModeStyle = searchModeLabel.map((label) => {
    return { label, style: `btn-sm btn-outline-secondary` };
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
    mapModeLabel,
    authLabel,
    keywordLabel,
    searchModeLabel,
    modePrompt,
    getCategoryLabel,
    getLoopLabel,
    getViewLabel,
    getMapModeLabel,
    // style
    dayStyle,
    timeStyle,
    categoryStyle,
    viewStyle,
    mapModeStyle,
    authStyle,
    searchModeStyle,
    // utils
    parseButtonInfo,
};

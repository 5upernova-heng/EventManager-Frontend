import Calendar from "./pages/Calendar";
import Alarms from "./pages/Alarms";
import Map from "./pages/Map";
import Logs from "./pages/Logs";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
export default [
    {
        path: "/dashboard",
        label: "个人主页",
        element: <Dashboard />,
        showOnTab: false,
        showBar: true,
    },
    {
        path: "/calendar",
        label: "日程日历",
        element: <Calendar />,
        showOnTab: true,
        showBar: true,
    },
    {
        path: "/map",
        label: "校园地图",
        element: <Map />,
        showOnTab: true,
        showBar: true,
    },
    {
        path: "/alarms",
        label: "闹钟管理",
        element: <Alarms />,
        showOnTab: true,
        showBar: true,
    },
    {
        path: "/logs",
        label: "查看日志",
        element: <Logs />,
        showOnTab: true,
        showBar: true,
    },
    {
        path: "/login",
        label: "登录",
        element: <Login />,
        showOnTab: false,
        showBar: false,
    },
];

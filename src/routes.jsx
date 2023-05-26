import Calendar from "./pages/Calendar";
import Alarms from "./pages/Alarms";
import Map from "./pages/Map";
import Logs from "./pages/Logs";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
export default [
    {
        path: "/dashboard",
        label: "个人主页",
        element: <Dashboard />,
        showOnTab: true,
        showBar: true,
        authLevel: 0,
    },
    {
        path: "/calendar",
        label: "日程日历",
        element: <Calendar />,
        showOnTab: true,
        showBar: true,
        authLevel: 0,
    },
    {
        path: "/map",
        label: "校园地图",
        element: <Map />,
        showOnTab: true,
        showBar: true,
        authLevel: 0,
    },
    {
        path: "/alarms",
        label: "闹钟管理",
        element: <Alarms />,
        showOnTab: true,
        showBar: true,
        authLevel: 0,
    },
    {
        path: "/groups",
        label: "团体管理",
        element: <Groups />,
        showOnTab: true,
        showBar: true,
        authLevel: 2,
    },
    {
        path: "/logs",
        label: "查看日志",
        element: <Logs />,
        showOnTab: true,
        showBar: true,
        authLevel: 2,
    },
    {
        path: "/login",
        label: "登录",
        element: <Login />,
        showOnTab: false,
        showBar: false,
        authLevel: 0,
    },
];

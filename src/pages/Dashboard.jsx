import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { LoginContext } from "../context/LoginContextProvider";
import { TimeContext } from "../context/TimeContextProvider";
import {
    getDateString,
    getDayString,
    getGreetings,
    getTimeString,
} from "../utils/calDate";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";
import { getComingEventApi } from "../api/eventApi";

function Dashboard() {
    const { auth } = useContext(AuthContext);
    const { username } = useContext(LoginContext);
    const { date } = useContext(TimeContext);
    const greetingSuffix = ["同学", "老师", "管理员"];

    const [events, setEvents] = useState([]);

    useEffect(() => {
        // fetch coming event
        const getComingEvents = async () => {
            const { data } = await getComingEventApi();
            setEvents(data);
        };
        getComingEvents();
    }, []);

    const renderEventCards = () => {
        if (events.length > 0) {
            return events.map((event, index) => {
                if (index < 4) return <EventCard event={event} />;
            });
        } else {
            return (
                <p className="text-center fw-bold fs-4 p-5">两天之内暂无日程</p>
            );
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div style={{ marginTop: "3rem" }}>
                <p className="fw-bold mb-0" style={{ fontSize: "8rem" }}>
                    {getTimeString(
                        date.getHours(),
                        date.getMinutes(),
                        date.getSeconds()
                    )}
                </p>
                <p className="fs-1 fw-bold text-center">
                    {`${getGreetings(date.getHours())}，${username} ${
                        greetingSuffix[auth]
                    }!`}
                </p>
            </div>
            <div
                className="border rounded rounded-5 shadow ps-3 pe-5 pt-3 pb-3"
                style={{
                    minWidth: "55rem",
                }}
            >
                <div className="d-flex justify-content-between ms-2 mt-2">
                    <p className="fw-bold fs-2 mb-3">{`今天 / ${getDayString(
                        date.getDay()
                    )}`}</p>
                    <p className="fs-2 mb-3 text-secondary">
                        {getDateString(
                            date.getFullYear(),
                            date.getMonth(),
                            date.getDate()
                        )}
                    </p>
                </div>
                {renderEventCards()}
                <div className="d-flex align-items-center justify-content-end">
                    <Link to="/calendar">
                        <p className="fs-5">{`>>查看更多日程`}</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

import React, { useContext, useEffect, useState } from "react";
import { TimeContext } from "../../context/TimeContextProvider";
import { LoginContext } from "../../context/LoginContextProvider";
import MessageCard from "./MessageCard";
import { getAllRemindsApi } from "../../api/remindApi";

export default function ReminderBar() {
    const [messages, setMessages] = useState([]);
    const { date } = useContext(TimeContext);
    const tick = Math.floor(date.getMinutes() / 15);
    const { isLogin, loginAccount } = useContext(LoginContext);

    const time = date.getTime();
    const { userId } = loginAccount;

    const fetchMessage = async () => {
        const { response } = await getAllRemindsApi(userId, time);
        setMessages(response);
    };

    useEffect(() => {
        if (isLogin) {
            fetchMessage();
        }
    }, [isLogin, tick]);

    const renderMessage = () => {
        if (messages.length > 0) {
            return messages.map((message) => <MessageCard message={message} />);
        } else {
            return <h5 className="text-center">暂无新的消息</h5>;
        }
    };
    return (
        <div>
            <h4 className="fw-bold text-center p-1">消息提醒</h4>
            {renderMessage()}
        </div>
    );
}

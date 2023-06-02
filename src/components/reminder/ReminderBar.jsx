import React, { useContext, useEffect, useState } from "react";
import { TimeContext } from "../../context/TimeContextProvider";
import { LoginContext } from "../../context/LoginContextProvider";
import MessageCard from "./MessageCard";
import { getAllRemindsApi } from "../../api/remindApi";

export default function ReminderBar() {
    const [messages, setMessages] = useState([]);
    const { date } = useContext(TimeContext);
    const tick = Math.floor(date.getMinutes() / 10);
    const { isLogin, loginAccount } = useContext(LoginContext);

    const time = date.getTime();
    const { userId } = loginAccount;

    const fetchMessage = async () => {
        const { response } = await getAllRemindsApi(userId, time);
        if (response.length > 0) {
            const newMessages = messages.concat(response);
            setMessages(newMessages);
        }
    };

    useEffect(() => {
        if (isLogin) {
            fetchMessage();
        }
    }, [isLogin, tick]);

    const deleteMessage = (index) => {
        const newMessages = [...messages];
        newMessages.splice(index, 1);
        setMessages(newMessages);
    };

    const renderMessage = () => {
        if (messages.length > 0) {
            return messages.map((message, index) => (
                <MessageCard
                    key={index}
                    message={message}
                    deleteHandler={(index) => deleteMessage(index)}
                />
            ));
        } else {
            return <h5 className="text-center">暂无新的消息</h5>;
        }
    };
    return (
        <div>
            <h4 className="fw-bold text-center p-1">消息提醒</h4>
            <div style={{ maxHeight: "calc(100vh - 250px)", overflow: "auto" }}>
                {renderMessage()}
            </div>
        </div>
    );
}

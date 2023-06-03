import React, { useContext, useEffect, useState } from "react";
import MessageCard from "./MessageCard";
import { EventContext } from "../../context/EventContextProvider";

export default function ReminderBar() {
    const { messages, setMessages } = useContext(EventContext);

    const deleteMessage = (index) => {
        const newMessages = [...messages];
        newMessages.splice(index, 1);
        setMessages(newMessages);
    };

    const renderMessage = () => {
        if (messages.length > 0) {
            return messages.map((message, index) => {
                return (
                    <MessageCard
                        key={index}
                        message={message}
                        deleteHandler={(index) => deleteMessage(index)}
                    />
                );
            });
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

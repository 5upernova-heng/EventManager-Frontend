import React, { useContext } from "react";
import { GroupContext } from "../../context/GroupContextProvider";

export default function MemberSelector({ members, toggleMember }) {
    const { users } = useContext(GroupContext);
    const renderUsers = (users) => {
        return users.map((user, index) => {
            return (
                <span
                    style={{
                        cursor: "pointer",
                    }}
                    key={index}
                    onClick={() => {
                        toggleMember(user.id);
                    }}
                    className={`${
                        members.includes(user.id)
                            ? "bg-primary"
                            : "bg-secondary"
                    } d-inline-block mx-1 my-1 border px-2 py-1 rounded rounded-pill opacity-75`}
                >
                    <p className="mb-0 fs-6 text-white">{user.userName}</p>
                </span>
            );
        });
    };
    return (
        <div className="d-flex justify-content-center">
            <div>
                <div
                    className="p-1 rounded border"
                    style={{
                        whiteSpace: "no-wrap",
                        wordBreak: "keep-all",
                        overflow: "auto",
                    }}
                >
                    {renderUsers(users)}
                </div>
            </div>
        </div>
    );
}

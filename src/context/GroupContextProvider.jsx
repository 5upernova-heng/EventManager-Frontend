import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContextProvider";
import { getGroupApi, getUsersApi } from "../api/groupApi";

export const GroupContext = createContext();

export default function GroupContextProvider({ children }) {
    const { auth } = useContext(AuthContext);
    // data
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    // view
    const [selectedGroup, setSelectedGroup] = useState(-1);
    useEffect(() => {
        if (auth > 1) {
            fetchGroup();
            fetchUsers();
        }
    }, []);

    const fetchUsers = async () => {
        const { data } = await getUsersApi();
        setUsers(data);
    };

    const fetchGroup = async () => {
        const { data } = await getGroupApi();
        setGroups(data);
    };

    /**Distrube users according to groups */
    const distrubeUser = () => {
        return groups.map((group) => {
            group.memberUser = group.member.map((uid) => users[uid]);
            return group;
        });
    };

    return (
        <GroupContext.Provider
            value={{
                // data
                users,
                groups,
                distrubeUser,
                // view
                selectedGroup,
                setSelectedGroup,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
}

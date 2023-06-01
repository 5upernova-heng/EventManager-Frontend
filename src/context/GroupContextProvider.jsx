import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContextProvider";
import {
    getGroupApi,
    addGroupApi,
    deleteGroupApi,
    updateGroupApi,
} from "../api/groupApi";
import {
    getUsersApi,
    addUserApi,
    deleteUserApi,
    updateUserApi,
} from "../api/userApi";
import { LoginContext } from "./LoginContextProvider";

export const GroupContext = createContext();

export default function GroupContextProvider({ children }) {
    const { isLogin } = useContext(LoginContext);
    const { auth } = useContext(AuthContext);
    // data
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);
    // view
    const [selectedUser, setSelectedUser] = useState(-1);
    const [selectedGroup, setSelectedGroup] = useState(-1);
    // submit
    const emptyUser = {
        username: "",
        password: "",
        authLevel: 0,
    };
    const emptyGroups = {
        name: "",
        members: [],
    };
    const [submitUser, setSubmitUser] = useState(emptyUser);
    const [submitGroup, setSubmitGroup] = useState(emptyGroups);
    useEffect(() => {
        if (isLogin) {
            if (auth > 1) {
                fetchGroup();
                fetchUsers();
            }
        }
    }, [auth, isLogin]);

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
    const changeSubmitUser = (dataObject) => {
        const newData = structuredClone(submitUser);
        for (const prop in dataObject) {
            newData[prop] = dataObject[prop];
        }
        setSubmitUser(newData);
    };

    const changeSubmitGroup = (dataObject) => {
        const newData = structuredClone(submitGroup);
        for (const prop in dataObject) {
            newData[prop] = dataObject[prop];
        }
        setSubmitGroup(newData);
    };

    // api
    const addUser = async (user) => {
        const { data: newUsers } = await addUserApi(user);
        setUsers(newUsers);
    };

    const updateUser = async (newUser) => {
        const { data: newUsers } = await updateUserApi(newUser.id, newUser);
        setUsers(newUsers);
    };

    const deleteUser = async (id) => {
        const { data: newUsers } = await deleteUserApi(id);
        setUsers(newUsers);
    };

    const addGroup = async (group) => {
        const { data: newGroups } = await addGroupApi(group);
        setGroups(newGroups);
    };

    const updateGroup = async (newGroup) => {
        const { data: newGroups } = await updateGroupApi(newGroup.id, newGroup);
        setGroups(newGroups);
    };

    const deleteGroup = async (id) => {
        const { data: newGroups } = await deleteGroupApi(id);
        setGroups(newGroups);
    };

    return (
        <GroupContext.Provider
            value={{
                // data
                users,
                distrubeUser,
                // view
                selectedUser,
                setSelectedUser,
                selectedGroup,
                setSelectedGroup,
                // sumbmit
                submitUser,
                submitGroup,
                setSubmitUser,
                setSubmitGroup,
                changeSubmitUser,
                changeSubmitGroup,
                // api
                addUser,
                deleteUser,
                updateUser,
                addGroup,
                deleteGroup,
                updateGroup,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
}

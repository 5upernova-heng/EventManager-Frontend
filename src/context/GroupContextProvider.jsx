import React, { createContext, useContext, useState, useEffect } from "react";
import { LoginContext } from "./LoginContextProvider";
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
import { TimeContext } from "./TimeContextProvider";
import { toast } from "react-toastify";

export const GroupContext = createContext();

export default function GroupContextProvider({ children }) {
    const { date } = useContext(TimeContext);
    const { isLogin, loginAccount } = useContext(LoginContext);
    const { auth } = useContext(LoginContext);

    const time = date.getTime();
    const { username: uid } = loginAccount;
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

    const fetchUsers = async () => {
        const { response } = await getUsersApi(uid, time);
        setUsers(response);
    };

    const fetchGroup = async () => {
        const { response } = await getGroupApi(uid, time);
        setGroups(response);
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
        const { name, members } = group;
        const { response } = await addGroupApi(uid, time, name, members);
        if (response === 1) {
            toast("创建失败：权限不足");
            return;
        }
        if (response === -2) {
            toast("创建失败：存在已有组织的用户");
            return;
        }
        fetchGroup();
    };

    const updateGroup = async (newGroup) => {
        const { response } = await updateGroupApi(newGroup.id, newGroup);
        fetchGroup();
    };

    const deleteGroup = async (id) => {
        const { response } = await deleteGroupApi(uid, time, id);
        if (response === 1) {
            toast("删除失败：权限不足");
            return;
        }
        if (response === -1) {
            toast("删除失败：用户/组织不存在");
            return;
        }
        fetchGroup();
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

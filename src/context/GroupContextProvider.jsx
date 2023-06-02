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
    joinClassApi,
    quitClassApi,
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
        id: "",
        userName: "",
        class: "",
        pwd: "",
        authority: 1,
        matters: [],
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

    const getUserName = (id) => {
        const index = users.indexOf(id);
        return index === -1 ? "未知" : users[index].userName;
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
        user.class = null;
        user.id = user.userName;
        const { response } = await addUserApi(uid, time, user);
        if (response === -1) {
            toast("添加失败：用户名已经存在/班级不存在");
            return;
        }
        toast("添加成功");
        fetchUsers();
    };

    const updateUser = async (newUser) => {
        const { response } = await updateUserApi(
            uid,
            time,
            newUser.id,
            newUser
        );
        if (response === -1) {
            toast("更新失败：用户/组织不存在");
            return;
        }
        toast("更新成功");
        fetchUsers();
    };

    const deleteUser = async (id) => {
        const { response } = await deleteUserApi(uid, time, id);
        if (response === -1) {
            toast("删除失败：用户/组织不存在");
            return;
        }
        if (response === 1) {
            toast("删除失败：权限不足");
            return;
        }
        toast("删除成功");
        fetchUsers();
    };

    const joinClass = async (userId, classId) => {
        const { response } = await joinClassApi(uid, time, userId, classId);
        if (response === -1) {
            toast("加入用户失败：找不到班级/用户，或该用户已有班级");
            return response;
        }
        if (response === 1) {
            toast("加入用户失败：权限不足");
            return response;
        }
        if (response === -2) {
            toast("加入用户失败：该用户已经加入其他班级");
            return response;
        }
        toast("加入成功");
        fetchUsers();
        fetchGroup();
        return 0;
    };

    const quitClass = async (userId) => {
        const { response } = await quitClassApi(uid, time, userId);
        if (response === -1) {
            toast("删除用户失败：找不到班级/用户");
            return response;
        }
        if (response === 1) {
            toast("删除用户失败：权限不足");
            return response;
        }
        toast("删除成功");
        fetchUsers();
        fetchGroup();
        return response;
    };

    const addGroup = async (group) => {
        const { name, members } = group;
        const { response } = await addGroupApi(uid, time, name, members);
        if (response === -1) {
            toast("创建失败：班级已存在 或 加入了未知用户");
            return;
        }
        if (response === 1) {
            toast("创建失败：权限不足");
            return;
        }
        if (typeof response === "object") {
            const duplicateMember = response.reduce(
                (str, member) => `${str} ${member}`,
                ""
            );
            toast(
                <div>
                    <p className="mb-0">{`创建失败：存在已有组织的用户`}</p>
                    <p>{duplicateMember}</p>
                </div>
            );
            return;
        }
        fetchUsers();
        fetchGroup();
    };

    const updateGroup = async (newGroup) => {
        const { response } = await updateGroupApi(newGroup.id, newGroup);
        fetchUsers();
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
                getUserName,
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
                joinClass,
                quitClass,
                addGroup,
                deleteGroup,
                updateGroup,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
}

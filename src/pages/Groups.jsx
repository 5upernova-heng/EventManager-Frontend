import React, { useContext, useState } from "react";
import { GroupContext } from "../context/GroupContextProvider";
import "/src/styles/Groups.css";
import GroupForm from "../components/forms/GroupForm";
import UserForm from "../components/forms/UserForm";
import Modal from "../components/Modal";
import List from "../components/List";

export default function Groups() {
    const {
        // data
        users,
        distrubeUser,
        // submit
        submitUser,
        submitGroup,
        setSubmitUser,
        setSubmitGroup,
        // api
        addUser,
        deleteUser,
        updateUser,
        addGroup,
        deleteGroup,
    } = useContext(GroupContext);
    const groups = distrubeUser();
    const fontStyle = "fw-bold fs-5 mb-0";
    const renderUser = (user, index) => {
        return (
            <div
                key={index}
                className="border rounded rounded-4 p-2 item-card"
                data-bs-toggle="modal"
                data-bs-target="#modifyUser"
                onClick={() => {
                    setSubmitUser(user);
                }}
            >
                <div className="d-flex align-items-center">
                    <p className={`ps-1 ${fontStyle}`}>{user.userName}</p>
                </div>
            </div>
        );
    };
    const renderGroup = (group, index) => {
        group.name = group.classId;
        group.members = group.member;
        return (
            <div
                key={index}
                className="border rounded rounded-4 p-2 item-card"
                data-bs-toggle="modal"
                data-bs-target="#modifyGroup"
                onClick={() => {
                    setSubmitGroup(group);
                }}
            >
                <div className="d-flex align-items-center">
                    <p className={`ps-1 ${fontStyle}`}>{group.name}</p>
                </div>
            </div>
        );
    };
    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col mt-5">
                <List
                    title="组织"
                    data={groups}
                    renderMethod={renderGroup}
                    addModalId="addGroup"
                />
            </div>
            <div className="col-1"></div>
            <div className="col mt-5">
                <List
                    title="用户"
                    data={users}
                    renderMethod={renderUser}
                    addModalId="addUser"
                />
            </div>
            <div className="col-2"></div>
            <Modal
                id="addGroup"
                headerLabel="添加组织"
                bodyComponent={<GroupForm disableInput={false} />}
                footerComponent={
                    <button
                        className="btn btn-success"
                        data-bs-dismiss="modal"
                        onClick={() => {
                            addGroup(submitGroup);
                        }}
                    >
                        确认提交
                    </button>
                }
            />
            <Modal
                id="modifyGroup"
                headerLabel="修改组织"
                bodyComponent={<GroupForm disableInput={true} />}
                footerComponent={
                    <>
                        <button
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                deleteGroup(submitGroup.name);
                            }}
                        >
                            删除
                        </button>
                    </>
                }
            />
            <Modal
                id="addUser"
                headerLabel="添加用户"
                bodyComponent={<UserForm />}
                footerComponent={
                    <button
                        className="btn btn-success"
                        data-bs-dismiss="modal"
                        onClick={() => {
                            addUser(submitUser);
                        }}
                    >
                        确认提交
                    </button>
                }
            />
            <Modal
                id="modifyUser"
                headerLabel="修改用户"
                bodyComponent={<UserForm />}
                footerComponent={
                    <>
                        <button
                            className="btn btn-danger"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                deleteUser(submitUser.id);
                            }}
                        >
                            删除
                        </button>
                        <button
                            className="btn btn-primary"
                            data-bs-dismiss="modal"
                            onClick={() => {
                                updateUser(submitUser);
                            }}
                        >
                            确认提交
                        </button>
                    </>
                }
            />
        </div>
    );
}

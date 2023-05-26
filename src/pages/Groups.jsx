import React, { useContext, useState } from "react";
import { GroupContext } from "../context/GroupContextProvider";
import "/src/styles/Groups.css";
import UserForm from "../components/forms/UserForm";
import OrgForm from "../components/forms/OrgForm";

export default function Groups() {
    const { distrubeUser, selectedGroup, setSelectedGroup } =
        useContext(GroupContext);
    const emptyUser = {
        username: "",
        password: "",
        authLevel: 0,
    };
    const emptyOrg = {
        id: "",
        memberUser: [],
    };
    // form related
    // mode: add(0), modify(1)
    const [userCRUDMode, setUserMode] = useState(0);
    const [submitUser, setSubmitUser] = useState(emptyUser);
    const [orgCRUDMode, setOrgMode] = useState(0);
    const [submitOrg, setSubmitOrg] = useState(emptyOrg);
    const groups = distrubeUser();
    const fontStyle = "fw-bold fs-5 mb-0";

    const changeSubmitUser = (dataObject) => {
        const newUser = structuredClone(submitUser);
        for (const prop in dataObject) {
            newUser[prop] = dataObject[prop];
        }
        setSubmitUser(newUser);
    };

    const changeSubmitOrg = (dataObject) => {
        const newUser = structuredClone(submitUser);
        for (const prop in dataObject) {
            newUser[prop] = dataObject[prop];
        }
        setSubmitOrg(newUser);
    };
    const renderGroups = () => {
        return groups.map((group, index) => {
            return (
                <div
                    className="border rounded rounded-4 p-2 item-card"
                    onClick={() => {
                        setSelectedGroup(index);
                        orgCRUDMode === 1 || setOrgMode(1);
                        setSubmitOrg(group);
                    }}
                >
                    <div className="d-flex align-items-center">
                        {index === selectedGroup && (
                            <i
                                className="fa fa-arrow-right"
                                aria-hidden="true"
                            ></i>
                        )}
                        <p className={`ps-1 ${fontStyle}`}>{group.id}</p>
                    </div>
                </div>
            );
        });
    };

    const renderGroupUsers = () => {
        if (selectedGroup === -1) {
            return (
                <p className={`text-center ${fontStyle}`}>
                    选择一个班级以添加学生
                </p>
            );
        }
        if (groups[selectedGroup].memberUser.length === 0) {
            return (
                <p className={`text-center ${fontStyle}`}>当前班级下没有学生</p>
            );
        }
        return groups[selectedGroup].memberUser.map((user) => {
            return (
                <div
                    className="border rounded rounded-4 p-2 item-card"
                    onClick={() => {
                        userCRUDMode === 1 || setUserMode(1);
                        setSubmitUser(user);
                    }}
                >
                    <p className={`${fontStyle}`}>{user.name}</p>
                </div>
            );
        });
    };
    return (
        <div className="row">
            <div className="col-2"></div>
            <div className="col mt-5">
                <p className="text-center fw-bold fs-4">组织列表</p>
                <div className="border rounded rounded-4">{renderGroups()}</div>
                <hr></hr>
                <div className="rounded my-3 p-2">
                    <OrgForm org={submitOrg} changeSubmit={changeSubmitOrg} />
                </div>
                <div className="d-flex align-items-center justify-content-end mt-4">
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={() => {
                            orgCRUDMode === 0 || setOrgMode(0);
                        }}
                    >
                        添加组织
                    </button>
                </div>
            </div>
            <div className="col-1"></div>
            <div className="col mt-5">
                <p className="text-center fw-bold fs-4">{`用户列表: ${
                    selectedGroup >= 0 && groups[selectedGroup].id
                        ? groups[selectedGroup].id
                        : "未选择班级"
                }`}</p>
                <div className="border rounded rounded-4">
                    {renderGroupUsers()}
                </div>
                <hr></hr>
                <div className="rounded my-3 p-2">
                    <UserForm
                        mode={userCRUDMode}
                        user={submitUser}
                        changeSubmit={changeSubmitUser}
                    />
                </div>
                <div className="d-flex align-items-center justify-content-end mt-4">
                    <button
                        className="btn btn-success"
                        type="button"
                        onClick={() => {
                            userCRUDMode === 0 || setUserMode(0);
                        }}
                    >
                        添加学生
                    </button>
                </div>
            </div>
            <div className="col-2"></div>
        </div>
    );
}

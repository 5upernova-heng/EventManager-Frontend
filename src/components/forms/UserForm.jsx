import React, { useContext } from "react";
import Input from "./Input";
import SelectButtonGroup from "./SelectButtonGroup";
import PropTypes from "prop-types";
import STYLE from "../../style";
import { GroupContext } from "../../context/GroupContextProvider";

export default function UserForm({}) {
    const { submitUser, changeSubmitUser } = useContext(GroupContext);
    const changeAuth = (auth) => {
        changeSubmitUser({ authLevel: auth });
    };

    const changeName = (name) => {
        changeSubmitUser({ username: name });
    };

    const changePassword = (password) => {
        changeSubmitUser({ password });
    };

    const changeClassName = (className) => {
        changeSubmitUser({ class: className });
    };

    return (
        <div>
            <Input
                label="用户名"
                name="username"
                type={"text"}
                onChange={(e) => {
                    changeName(e.target.value);
                }}
            />
            <Input
                label="密码"
                name="password"
                type={"text"}
                onChange={(e) => {
                    changePassword(e.target.value);
                }}
            />
            <Input
                label="班级"
                name="class"
                type={"text"}
                onChange={(e) => {
                    changeClassName(e.target.value);
                }}
            />
            <p className="my-1 fw-bold">权限等级</p>
            <SelectButtonGroup
                buttonsInfo={STYLE.parseButtonInfo(
                    STYLE.authStyle,
                    submitUser.authLevel
                )}
                changeSelect={changeAuth}
            />
        </div>
    );
}

UserForm.propType = {};

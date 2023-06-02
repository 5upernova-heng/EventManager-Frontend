import React, { useContext } from "react";
import Input from "./Input";
import SelectButtonGroup from "./SelectButtonGroup";
import PropTypes from "prop-types";
import STYLE from "../../style";
import { GroupContext } from "../../context/GroupContextProvider";

export default function UserForm() {
    const { submitUser, changeSubmitUser } = useContext(GroupContext);
    const { userName, pwd } = submitUser;
    // console.log(submitUser);
    const changeAuth = (auth) => {
        changeSubmitUser({ authority: auth + 1 });
    };

    const changeName = (name) => {
        changeSubmitUser({ userName: name });
    };

    const changePassword = (password) => {
        changeSubmitUser({ pwd: password });
    };

    const changeClassName = (className) => {
        changeSubmitUser({ class: className });
    };

    return (
        <div>
            <label className="fw-bold  mb-1" htmlFor="userName">
                用户名
            </label>
            <input
                id="userName"
                label="用户名"
                name="username"
                value={userName}
                type="text"
                className="form-control"
                onChange={(e) => {
                    changeName(e.target.value);
                }}
            />
            <label className="fw-bold  mb-1" htmlFor="password">
                密码
            </label>
            <input
                id="password"
                label="密码"
                name="password"
                type={"text"}
                value={pwd ? pwd : ""}
                className="form-control"
                onChange={(e) => {
                    changePassword(e.target.value);
                }}
            />
            <p className="my-1 fw-bold">权限等级</p>
            <div className="d-flex justify-content-center align-items-center">
                <SelectButtonGroup
                    buttonsInfo={STYLE.parseButtonInfo(
                        STYLE.authStyle,
                        submitUser.authority - 1
                    )}
                    changeSelect={changeAuth}
                />
            </div>
        </div>
    );
}

UserForm.propType = {};

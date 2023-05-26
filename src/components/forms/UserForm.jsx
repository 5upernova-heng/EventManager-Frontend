import React from "react";
import Input from "./Input";
import SelectButtonGroup from "./SelectButtonGroup";
import PropTypes from "prop-types";
import STYLE from "../../style";

export default function UserForm({ mode, user, changeSubmit }) {
    // mode: add(0), modify(1)
    const changeAuth = (auth) => {
        changeSubmit({ authLevel: auth });
    };

    const changeName = (name) => {
        changeSubmit({ name });
    };

    return (
        <div>
            <Input
                label="用户名"
                type={"text"}
                value={user.name}
                onChange={(e) => {
                    changeName(e.target.value);
                }}
            />
            {mode === 0 && <Input label="密码" type={"password"} />}
            <p className="my-1 fw-bold">权限等级</p>
            <SelectButtonGroup
                buttonsInfo={STYLE.parseButtonInfo(
                    STYLE.authStyle,
                    user.authLevel
                )}
                changeSelect={changeAuth}
            />
            <div className="d-flex align-items-center justify-content-end mt-3">
                <button className="btn btn-sm btn-primary mx-2">
                    提交修改
                </button>
                {mode === 1 && (
                    <button className="btn btn-sm btn-danger mx-2">删除</button>
                )}
            </div>
        </div>
    );
}

UserForm.propType = {
    mode: PropTypes.number.isRequired,
};

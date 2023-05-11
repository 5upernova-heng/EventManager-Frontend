import React from "react";
import PropTypes from "prop-types";
import Input from "./Input";

function LoginFormGroup(props) {
    return (
        <div style={{ minWidth: "600px" }}>
            <Input name="username" label="用户名" onChange={() => {}} />
            <div className="py-4"></div>
            <Input name="password" label="密码" onChange={() => {}} />
            <div className="mt-5 d-flex justify-content-center align-items-center">
                <button className="btn btn-lg btn-primary">登录</button>
            </div>
        </div>
    );
}

LoginFormGroup.propTypes = {};

export default LoginFormGroup;

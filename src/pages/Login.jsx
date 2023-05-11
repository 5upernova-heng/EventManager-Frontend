import React from "react";
import PropTypes from "prop-types";
import LoginFormGroup from "../components/forms/LoginFormGroup";

function Login({ isLogin, setLogin }) {
    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                background:
                    "linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(9,37,121,1) 0%, rgba(0,212,255,1) 100%)",
            }}
        >
            <div className="card rounded-4 shadow-lg bg-light position-absolute top-50 start-50 translate-middle p-5">
                <h2 className="text-center mb-4">日程管理系统</h2>
                <LoginFormGroup />
            </div>
        </div>
    );
}

Login.propTypes = {};

export default Login;

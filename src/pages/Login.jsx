import React from "react";
import PropTypes from "prop-types";
import LoginFormGroup from "../components/forms/LoginFormGroup";

function Login() {
    return (
        <div
            width="100%"
            style={{
                height: "100vh",
                background:
                    "linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(9,37,121,1) 0%, rgba(0,212,255,1) 100%)",
            }}
        >
            <div className="card rounded-4 shadow-lg bg-light position-absolute top-50 start-50 translate-middle p-5">
                <img
                    src="/src/assets/bupt_logo.svg"
                    alt="Logo"
                    width="100"
                    height="100"
                    className="mx-auto d-block mb-3"
                />
                <h3 className="text-center fw-bold mb-4">学生日程管理系统</h3>
                <div className="p-4" />
                <LoginFormGroup />
            </div>
        </div>
    );
}

Login.propTypes = {};

export default Login;

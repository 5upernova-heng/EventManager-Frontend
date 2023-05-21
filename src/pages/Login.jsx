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
                    "radial-gradient(61.04% 89.69% at 100% 100%, rgba(200, 250, 255, 0.08) 0%, rgba(28, 210, 229, 0.08) 40.63%, rgba(28, 210, 229, 0) 100%), radial-gradient(43.78% 64.34% at 60.31% 100%, rgba(23, 74, 228, 0.08) 0%, rgba(23, 74, 228, 0) 100%), linear-gradient(180deg, rgba(23, 74, 228, 0) 29.44%, rgba(23, 74, 228, 0.06) 100%), linear-gradient(90deg, #F3F3F7 0%, #EBF0F9 100%)",
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

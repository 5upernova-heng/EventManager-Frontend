import React from "react";
import LoginFormGroup from "../components/forms/LoginFormGroup";

function Login() {
    return (
        <div>
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

import React, { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { TimeContext } from "./TimeContextProvider";
import { login } from "../api/loginApi";
import { useNavigate } from "react-router-dom";

export const LoginContext = createContext();
export default function LoginContextProvider({ children, isLogin, setLogin }) {
    const emptyAccount = { username: "admin", userId: "admin" };
    const { date } = useContext(TimeContext);
    const [loginAccount, setAccount] = useState(emptyAccount);
    const navigate = useNavigate();
    const tryLogin = async (account) => {
        const { response } = await login(account, date.getTime());
        if (response) {
            setAccount(account);
            setLogin(true);
            toast("登录成功");
            navigate("/calendar");
        } else {
            toast("登录失败，请检查用户名和密码是否正确");
        }
    };
    const quitLogin = () => {
        setLogin(false);
        setAccount(emptyAccount);
    };
    return (
        <LoginContext.Provider
            value={{
                isLogin,
                tryLogin,
                quitLogin,
                loginAccount,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
}

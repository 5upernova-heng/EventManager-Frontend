import React, { createContext, useState } from "react";
import { toast } from "react-toastify";

export const LoginContext = createContext();
export default function LoginContextProvider({
    children,
    isLogin,
    setLogin: login,
}) {
    const emptyAccount = { username: "", userId: "" };
    const [loginAccount, setAccount] = useState(emptyAccount);
    const tryLogin = (account) => {
        if (true) {
            setAccount(account);
            login(true);
            toast("登录成功");
        } else {
            toast("登录失败，请检查用户名和密码是否正确");
        }
    };
    const quitLogin = () => {
        login(false);
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

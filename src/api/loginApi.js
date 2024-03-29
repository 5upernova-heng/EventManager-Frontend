import request from "./request";
import { apiRoot } from "/src/config.json";

export async function login(account, time) {
    const { username, password } = account;
    const { data } = await request.get(`${apiRoot}/login`, {
        params: {
            uid: username,
            pwd: password,
            time,
        },
    });
    return data;
}

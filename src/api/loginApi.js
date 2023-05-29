import request from "./request";
import { apiRoot } from "/src/config.json";

export async function login(account) {
    const { username, password } = account;
    const { data } = request.post(`${apiRoot}/login`, {
        id_: username,
        pwd: password,
    });
    return data;
}

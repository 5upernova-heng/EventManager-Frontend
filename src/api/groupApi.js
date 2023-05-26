import request from "./request";
import { apiRoot } from "/src/config.json";

export async function getGroupApi(event) {
    const response = await request.get(`${apiRoot}/groups`);
    return response;
}

export async function getUsersApi(event) {
    const response = await request.get(`${apiRoot}/users`);
    return response;
}

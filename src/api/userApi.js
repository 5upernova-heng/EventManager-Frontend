import request from "./request";
import { apiRoot } from "/src/config.json";

export async function getUsersApi() {
    const response = await request.get(`${apiRoot}/users`);
    return response;
}

export async function addUserApi(user) {
    await request.post(`${apiRoot}/users`, user);
    return getUsersApi();
}

export async function deleteUserApi(id) {
    await request.delete(`${apiRoot}/users/${id}`);
    return getUsersApi();
}

export async function updateUserApi(id, user) {
    await request.put(`${apiRoot}/users/${id}`, user);
    return getUsersApi();
}

import request from "./request";
import { apiRoot } from "/src/config.json";

export async function getGroupApi() {
    const response = await request.get(`${apiRoot}/groups`);
    return response;
}

export async function addGroupApi(group) {
    await request.post(`${apiRoot}/groups`, group);
    return getGroupApi();
}

export async function deleteGroupApi(id) {
    await request.delete(`${apiRoot}/groups/${id}`);
    return getGroupApi();
}

export async function updateGroupApi(id, group) {
    await request.put(`${apiRoot}/groups/${id}`, group);
    return getGroupApi();
}

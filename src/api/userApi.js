import request from "./request";
import { apiRoot } from "/src/config.json";

export async function getOneUserApi(uid, time, targetId) {
    const response = await request.get("http://localhost:5000/user", {
        params: {
            uid,
            time,
            targetId,
        },
    });
    return response;
}

/**Get all user, id only */
export async function getUsersApi(uid, time) {
    const { data } = await request.get(`http://localhost:5000/user`, {
        params: {
            uid,
            time,
        },
    });
    return data;
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

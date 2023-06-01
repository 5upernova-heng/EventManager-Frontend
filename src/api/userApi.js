import request from "./request";
// import { apiRoot } from "/src/config.json";
const apiRoot = "http://localhost:5000";

export async function getOneUserApi(uid, time, targetId) {
    console.log("Send request: getOneUserApi");
    const { data } = await request.get(`${apiRoot}/user`, {
        params: {
            uid,
            time,
            targetId,
        },
    });
    console.log("Response data of getOneUserApi:", data);
    return data;
}

/**Get all user, id only */
export async function getUsersApi(uid, time) {
    console.log("Send request: getUsersApi");
    const { data } = await request.get(`${apiRoot}/user`, {
        params: {
            uid,
            time,
        },
    });
    console.log("Response data of getUsersApi:", data);
    return data;
}

export async function addUserApi(uid, time, user) {
    console.log("Send request: addUserApi");
    const { data } = await request.post(`${apiRoot}/user`, user, {
        params: { uid, time },
    });
    console.log("Response data of addUserApi:", data);
    return data;
}

export async function deleteUserApi(uid, time, id) {
    console.log("Send request: deleteUserApi");
    const { data } = await request.delete(`${apiRoot}/user`, {
        params: {
            uid,
            time,
            id,
        },
    });
    console.log("Response data of deleteUserApi:", data);
    return data;
}

export async function updateUserApi(uid, time, targetId, user) {
    console.log("Send request: editUsersApi");
    const { data } = await request.put(`${apiRoot}/user`, user, {
        params: {
            uid,
            time,
            targetId,
        },
    });
    console.log("Response data of editUserApi:", data);
    return data;
}

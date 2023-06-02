import request from "./request";
// import { apiRoot } from "/src/config.json";
const apiRoot = "http://localhost:5000";

export async function getOneUserApi(uid, time, targetId) {
    console.log("Send request: getOneUserApi |", uid, time, targetId);
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
    console.log("Send request: getUsersApi |", uid, time);
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
    console.log("Send request: addUserApi |", uid, time, user);
    const { data } = await request.post(`${apiRoot}/user`, user, {
        params: { uid, time },
    });
    console.log("Response data of addUserApi:", data);
    return data;
}

export async function deleteUserApi(uid, time, id) {
    console.log("Send request: deleteUserApi |", uid, time, id);
    const { data } = await request.delete(`${apiRoot}/user`, {
        params: {
            uid,
            time,
            targetId: id,
        },
    });
    console.log("Response data of deleteUserApi:", data);
    return data;
}

export async function updateUserApi(uid, time, targetId, user) {
    console.log("Send request: editUsersApi |", uid, time, targetId, user);
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

export async function joinClassApi(uid, time, targetUserId, classId) {
    console.log(
        "Send request: joinClassApi |",
        uid,
        time,
        targetUserId,
        classId
    );
    const { data } = await request.post(
        `${apiRoot}/user/class`,
        {},
        {
            params: {
                uid: uid,
                time,
                targetId: targetUserId,
                name: classId,
            },
        }
    );
    console.log("Response data of joinClassApi:", data);
    return data;
}

export async function quitClassApi(uid, time, targetUserId) {
    console.log("Send request: quitClassApi |", uid, time, targetUserId);
    const { data } = await request.delete(`${apiRoot}/user/class`, {
        params: {
            uid,
            time,
            targetId: targetUserId,
        },
    });
    console.log("Response data of quitClassApi:", data);
    return data;
}

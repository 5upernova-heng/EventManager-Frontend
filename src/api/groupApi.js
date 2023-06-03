import request from "./request";
import { apiRoot } from "/src/config.json";

export async function getGroupApi(uid, time, classId) {
    console.log("Send request: getGroupApi");
    console.log(uid, time, classId);
    const { data } = await request.get(`${apiRoot}/class`, {
        params: {
            uid,
            time,
            classId,
        },
    });
    console.log("Response data of getGroupApi:", data);
    return data;
}

export async function addGroupApi(uid, time, classId, members) {
    console.log("Send request: addGroupApi |", uid, time, classId, members);
    const { data } = await request.post(`${apiRoot}/class`, members, {
        params: {
            uid,
            time,
            classId,
        },
    });
    console.log("Response data of addGroupApi:", data);
    return data;
}

export async function deleteGroupApi(uid, time, classId) {
    console.log("Send request: deleteGroupApi");
    const { data } = await request.delete(`${apiRoot}/class`, {
        params: {
            uid,
            time,
            classId,
        },
    });
    console.log("Response data of deleteGroupApi:", data);
    return data;
}

export async function updateGroupApi(id, group) {
    console.log("Send request: updateGroupApi");
    const { data } = await request.put(`${apiRoot}/class`, group);
    console.log("Response data of updateGroupApi:", data);
    return data;
}

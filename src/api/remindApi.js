import request from "./request";

const apiRoot = "http://localhost:5000";

export async function getAllRemindsApi(uid, time) {
    const { data } = await request.get(`${apiRoot}/remind`, {
        params: {
            uid,
            time,
        },
    });
    return data;
}

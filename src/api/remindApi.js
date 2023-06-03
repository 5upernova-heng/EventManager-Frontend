import request from "./request";
import { apiRoot } from "/src/config.json";

export async function getAllRemindsApi(uid, time) {
    const { data } = await request.get(`${apiRoot}/remind`, {
        params: {
            uid,
            time,
        },
    });
    return data;
}

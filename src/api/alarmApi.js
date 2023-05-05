import request from "./request";
import { apiRoot } from "../config.json";

export function getAlarmApi() {
    return request.get(`${apiRoot}/alarms`);
}

export async function addAlarmApi(alarm) {
    await request.post(`${apiRoot}/alarms`, alarm);
    return getAlarmApi();
}

export async function deleteAlarmApi(id) {
    await request.delete(`${apiRoot}/alarms/${id}`);
    return getAlarmApi();
}

export async function updateAlarmApi(id, alarm) {
    await request.put(`${apiRoot}/alarms/${id}`, alarm);
    return getAlarmApi();
}

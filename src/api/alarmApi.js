import request from "./request";
import { apiRoot } from "../config.json";

export function getAlarms() {
    return request.get(`${apiRoot}/alarms`);
}

export async function addAlarms(alarm) {
    await request.post(`${apiRoot}/alarms`, alarm);
    return getAlarms();
}

export async function deleteAlarms(id) {
    await request.delete(`${apiRoot}/alarms/${id}`);
    return getAlarms();
}

export async function updateAlarms(id, alarm) {
    await request.put(`${apiRoot}/alarms/${id}`, alarm);
    return getAlarms();
}

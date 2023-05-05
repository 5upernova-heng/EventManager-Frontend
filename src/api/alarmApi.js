import request from "./request";
import { apiRoot } from "../config.json";

export function getAlarms() {
    return request.get(`${apiRoot}/alarms`);
}

export function addAlarms(alarm) {
    return request.post(`${apiRoot}/alarms`, alarm);
}

export function deleteAlarms(id) {
    return request.delete(`${apiRoot}/alarms/${id}`);
}

export function updateAlarms(id, alarm) {
    return request.put(`${apiRoot}/alarms/${id}`, alarm);
}

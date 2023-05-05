import request from "./request";
import { apiRoot } from "../config.json";

export function getEventsApi() {
    return request.get(`${apiRoot}/events`);
}

export async function addEventApi(event) {
    await request.post(`${apiRoot}/events`, event);
    return getEventsApi();
}

export async function deleteEventApi(id) {
    await request.delete(`${apiRoot}/events/${id}`);
    return getEventsApi();
}

export async function updateEventApi(id, event) {
    await request.put(`${apiRoot}/events/${id}`, event);
    return getEventsApi();
}

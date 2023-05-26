import request from "./request";
import { apiRoot } from "../config.json";

export async function getEventsApi() {
    const response = await request.get(`${apiRoot}/events`);
    return response;
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

export async function getComingEventApi() {
    return request.get(`${apiRoot}/coming`);
}

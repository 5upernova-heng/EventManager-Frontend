import request from "./request";
import { apiRoot } from "../config.json";

export function getEvents() {
    return request.get(`${apiRoot}/events`);
}

export function deleteEvent(id) {
    return request.delete(`${apiRoot}/events/${id}`);
}

export function updateEvent(id, event) {
    return request.put(`${apiRoot}/events/${id}`, event);
}

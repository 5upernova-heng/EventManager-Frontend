import request from "./request";
// import { apiRoot } from "../config.json";
const apiRoot = "http://localhost:5000";

export async function getEventsApi(uid, time, targetId, ltime, rtime) {
    const response = await request.get(`${apiRoot}/events`, {
        params: {
            uid,
            time,
            targetId,
            ltime,
            rtime,
        },
    });
    return response;
}

export async function addEventApi(event, uid, time) {
    const { data } = await request.post(`${apiRoot}/events`, event, {
        params: {
            uid,
            time,
        },
    });
    return data;
}

export async function deleteEventApi(uid, time, id) {
    console.log("Sending request: deleteEventApi |", uid, time, id);
    await request.delete(`${apiRoot}/events`, {
        params: {
            uid,
            time,
            targetId: id,
        },
    });
    return getEventsApi(uid, time, uid);
}

export async function updateEventApi(uid, time, targetId, event) {
    console.log(
        "Sending request: updateEventApi |",
        uid,
        time,
        targetId,
        event
    );
    await request.put(`${apiRoot}/events`, event, {
        params: {
            uid,
            time,
            targetId,
        },
    });
    return getEventsApi(uid, time, uid);
}

export async function getComingEventApi() {
    // return request.get(`${apiRoot}/coming`);
    return request.get(`http://localhost:3000/coming`);
}

export async function searchEventsApi() {
    const response = await request.get(`${apiRoot}/events`);
    return response;
}

export async function impartMatter(userId, targetId, time, eventId) {
    return await request.post(
        `${apiRoot}/user/matter`,
        {},
        {
            params: {
                uid: userId,
                time,
                targetId,
                matterId: eventId,
            },
        }
    );
}

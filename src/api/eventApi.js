import request from "./request";
// import { apiRoot } from "../config.json";
const apiRoot = "http://localhost:5000";

export async function getEventsApi(uid, time, targetId, ltime, rtime) {
    console.log("Sending request: getEventsApi |", uid);
    const { data } = await request.get(`${apiRoot}/events`, {
        params: {
            uid,
            time,
            targetId,
            ltime,
            rtime,
        },
    });
    console.log("Result: ", data);
    return data;
}

export async function addEventApi(event, uid, time) {
    console.log("Sending request: addEventApi |", uid, event);
    const { data } = await request.post(`${apiRoot}/events`, event, {
        params: {
            uid,
            time,
        },
    });
    console.log("Result: ", data);
    return data;
}

export async function deleteEventApi(uid, time, id) {
    console.log("Sending request: deleteEventApi |", uid, time, id);
    const { data } = await request.delete(`${apiRoot}/events`, {
        params: {
            uid,
            time,
            targetId: id,
        },
    });
    console.log("Result: ", data);
    return data;
}

export async function updateEventApi(uid, time, targetId, event) {
    console.log(
        "Sending request: updateEventApi |",
        uid,
        time,
        targetId,
        event
    );
    const { data } = await request.put(`${apiRoot}/events`, event, {
        params: {
            uid,
            time,
            targetId,
        },
    });
    console.log("Result: ", data);
    return data;
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
    const { data } = await request.post(
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
    console.log("Result: ", data);
    return data;
}

export async function coverEventApi(uid, time, targetId, eventId) {
    console.log(
        "Sending request: coverEventApi |",
        uid,
        time,
        targetId,
        eventId
    );

    const { data } = await request.put(
        `${apiRoot}/collide`,
        {},
        {
            params: {
                uid,
                time,
                targetId,
                matterId: eventId,
            },
        }
    );
    console.log("Result: ", data);
    return data;
}

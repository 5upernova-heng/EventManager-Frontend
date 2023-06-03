import request from "./request";
import { apiRoot } from "../config.json";

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
    console.log("Response data of getEventsApi:", data);
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
    console.log("Response data of addEventApi:", data);
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
    console.log("Response data of deleteEventApi:", data);
    return data;
}

export async function updateEventApi(uid, time, targetId, event, confirm) {
    console.log(
        "Sending request: updateEventApi |",
        uid,
        time,
        targetId,
        event,
        confirm
    );
    const { data } = await request.put(`${apiRoot}/events`, event, {
        params: {
            uid,
            time,
            targetId,
            confirm,
        },
    });
    console.log("Response data of updateEventApi:", data);
    return data;
}

export async function searchEventsApi(
    uid,
    time,
    stringLabels,
    otherLabels,
    keyWords
) {
    console.log(
        "Sending request: searchEventsApi |",
        uid,
        time,
        stringLabels,
        otherLabels,
        keyWords
    );
    const { data } = await request.post(
        `${apiRoot}/search`,
        {
            stringLabels,
            otherLabels,
            keyWords,
        },
        {
            params: {
                uid,
                time,
            },
        }
    );
    console.log("Response data of searchEventApi:", data);
    return data;
}

export async function clearSearchApi(uid, time) {
    console.log("Sending request: clearSearchApi |", uid, time);
    const { data } = await request.delete(`${apiRoot}/search`, {
        params: { uid, time },
    });
    console.log("Result of clearSearchApi", data);
    return data;
}

export async function impartMatterApi(uid, targetId, time, eventId) {
    console.log(
        "Sending request: impartMatterApi |",
        uid,
        targetId,
        time,
        eventId
    );
    const { data } = await request.post(
        `${apiRoot}/user/matter`,
        {},
        {
            params: {
                uid: uid,
                time,
                targetId,
                matterId: eventId,
            },
        }
    );
    console.log("Response data of impartMatterApi:", data);
    return data;
}

export async function quitMatterApi(uid, time, targetId, eventId) {
    console.log("Sending request: quitMatterApi", uid, time, targetId, eventId);
    const { data } = await request.delete(`${apiRoot}/user/matter`, {
        params: {
            uid,
            time,
            targetId,
            matterId: eventId,
        },
    });
    console.log("Response data of quitMatterApi:", data);
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
    console.log("Response data of coverEventApi:", data);
    return data;
}

export async function getAvailableTimeApi(uid, time, length, loop) {
    console.log(
        "Sending request: getAvailableTimeApi |",
        uid,
        time,
        length,
        loop
    );
    const { data } = await request.get(`${apiRoot}/getavailable`, {
        params: {
            uid,
            time,
            length,
            loop,
        },
    });
    console.log("Response data of getAvailableTimeApi:", data);
    return data;
}

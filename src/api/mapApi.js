import request from "./request";
import { apiRoot } from "../config.json";

export async function getNodesApi() {
    const response = await request.get(`${apiRoot}/nodes`);
    return response;
}

export async function getRoutesApi() {
    const response = await request.get(`${apiRoot}/routes`);
    return response;
}

export async function findPathApi() {
    const response = await request.get(`${apiRoot}/path`);
    return response;
}

export async function findRouteApi(uid, time, start, passBy, ride) {
    console.log(
        "Sending request: findRouteApi |",
        uid,
        time,
        start,
        passBy,
        ride
    );
    const { data } = await request.post(`${apiRoot}/findRoute`, passBy, {
        params: {
            uid,
            time,
            start,
            ride,
        },
    });
    console.log("Response data of findRouteApi:", data);
    return data;
}

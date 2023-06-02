import request from "./request";
import { apiRoot } from "../config.json";

// export async function getNodesApi() {
//     const response = await request.get(`${apiRoot}/nodes`);
//     return response;
// }

export async function findPathApi() {
    const response = await request.get(`${apiRoot}/path`);
    return response;
}

export async function getNodesApi(uid, time) {
    console.log("Sending request: getNodesApi |", uid, time);
    const { data } = await request.get(`http://localhost:5000/node`, {
        params: {
            uid,
            time,
        },
    });
    console.log("Response data of getNodesApi |", data);
    return data;
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
    const strPassBy = passBy.map((node) => String(node));
    console.log(strPassBy);
    const { data } = await request.post(
        `http://localhost:5000/findRoute`,
        strPassBy,
        {
            params: {
                uid,
                time,
                start,
                ridable: ride,
            },
        }
    );
    console.log("Response data of findRouteApi:", data);
    return data;
}

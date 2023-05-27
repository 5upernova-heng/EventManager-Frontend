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

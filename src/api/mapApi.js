import request from "./request";
import { apiRoot } from "../config.json";

export function getNodesApi() {
    return request.get(`${apiRoot}/nodes`);
}

export function getRoutesApi() {
    return request.get(`${apiRoot}/routes`);
}

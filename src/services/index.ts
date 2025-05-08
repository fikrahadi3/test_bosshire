import { APIFetch } from "../types";

export async function handleFetch({ method, params, path }: APIFetch) {
  let headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Accept", "application/json");

  let request: RequestInit = {
    method,
    headers,
  };
  if (method !== "GET") request.body = JSON.stringify(params);

  return fetch(`https://fakestoreapi.com/${path}`, request);
}

import { GetUserByIDReq, LoginReq } from "../types/user";

import { handleFetch } from ".";

export async function login(params: LoginReq) {
  return handleFetch({
    method: "POST",
    params,
    path: "auth/login",
  });
}

export async function getUsers() {
  return handleFetch({
    method: "GET",
    params: {},
    path: "users",
  });
}

export async function getUserByID({ id }: GetUserByIDReq) {
  return handleFetch({
    method: "GET",
    params: {},
    path: `users/${id}`,
  });
}

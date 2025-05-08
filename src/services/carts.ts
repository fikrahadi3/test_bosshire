import { handleFetch } from ".";
import { GetCartsByIDReq } from "../types/carts";

export async function getCarts() {
  return handleFetch({
    method: "GET",
    params: {},
    path: "carts",
  });
}

export async function getCartsById({ id }: GetCartsByIDReq) {
  return handleFetch({
    method: "GET",
    params: {},
    path: `carts/${id}`,
  });
}

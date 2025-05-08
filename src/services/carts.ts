import { handleFetch } from ".";
import { AddCartReq, GetCartsByIDReq } from "../types/carts";

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

export async function addCart(params: AddCartReq) {
  return handleFetch({
    method: "POST",
    params,
    path: "carts",
  });
}
export async function getProducts() {
  return handleFetch({
    method: "GET",
    params: {},
    path: "products",
  });
}

export async function getProductsById({ id }: GetCartsByIDReq) {
  return handleFetch({
    method: "GET",
    params: {},
    path: `products/${id}`,
  });
}

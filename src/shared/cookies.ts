"use server";

import { cookies } from "next/headers";

export const checkCookie = async () => {
  const cookieStore = await cookies();
  return !!cookieStore.get("username");
};

export const addCookie = async (key: string, value: string) => {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
};

"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { getUsers, login } from "../../../services/user";
import { addCookie, checkCookie } from "../../../shared/cookies";
import { User } from "../../../types/user";

const useLogin = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<any>({
    username: "",
    password: "",
  });
  const [snackbar, setSnackbar] = useState<any>({
    open: false,
    message: "",
    severity: "",
  });

  const getAllUsers = async (username: string) => {
    const resp = await getUsers();
    const data: User[] = await resp.json();

    return (
      data.find((item) => item.username === username) || {
        username: username,
        name: {
          firstname: username,
          lastname: username,
        },
        id: 0,
      }
    );
  };

  const checkIsAlreadyLogin = async () => {
    setIsLoading(true);
    const isAlreadyLogin = await checkCookie();
    if (isAlreadyLogin) {
      setSnackbar({
        open: true,
        message: "You already login",
        severity: "warning",
      });

      setTimeout(() => {
        router.push("/dashboard/cart");
      }, 500);
      return;
    }

    setIsLoading(false);
  };

  const handleCookie = async () => {
    const { name, id } = await getAllUsers(formData.username);

    await addCookie("username", formData.username || "");
    localStorage.setItem("user", JSON.stringify({ name, id }));
  };

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resp = await login(formData);
      const data = await resp.json();

      setSnackbar({
        open: true,
        message: "Login Success",
        severity: "success",
      });

      await handleCookie();
      setTimeout(() => {
        router.push("/dashboard/cart");
      }, 500);
    } catch (err) {
      let mess = "Unknown Error";
      if (err instanceof Error) mess = err.message;

      setSnackbar({
        open: true,
        message: mess,
        severity: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    checkIsAlreadyLogin();
  }, []);

  return {
    isLoading,
    snackbar,
    handleOnChange,
    handleOnClose,
    handleOnSubmit,
  };
};

export default useLogin;

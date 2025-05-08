"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { login } from "../../../services/user";
import { addCookie, checkCookie } from "../../../shared/cookies";

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

  const handleCookie = async (username: string) => {
    await addCookie("username", username);
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

      handleCookie(formData.username);
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

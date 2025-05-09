"use client";

import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { addCart, getProducts } from "../../../../../services/carts";
import { Cart, Product, ProductDetail } from "../../../../../types/carts";
import { User } from "../../../../../types/user";

import { isDuplicate, isLessThanZero } from "./functions";

const useCreate = () => {
  const router = useRouter();

  const [datas, setDatas] = useState<Product[]>([]);
  const [products, setProducts] = useState<ProductDetail[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [snackbar, setSnackbar] = useState<any>({
    open: false,
    message: "",
    severity: "",
  });

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const resp = await getProducts();
      const data: ProductDetail[] = await resp.json();
      setProducts(data);
    } catch (err) {
      let mess = "Unknown Error";
      if (err instanceof Error) mess = err.message;
      setSnackbar({
        open: true,
        message: mess,
        severity: "error",
      });
    }
    setIsLoading(false);
  };

  const handleDeleteProduct = (productId: number) => {
    setDatas((prev) => prev.filter((item) => item.productId !== productId));
  };

  const handleAddProduct = (
    productId: number,
    quantity: number,
    title: string,
    price: number
  ) => {
    if (isLessThanZero(quantity)) {
      setSnackbar({
        open: true,
        message: "Quantity should be more than 0",
        severity: "warning",
      });
      return;
    }
    if (isDuplicate(productId, datas)) {
      setSnackbar({
        open: true,
        message: "Can't add duplicate product",
        severity: "warning",
      });
      return;
    }

    setDatas((prev) => [
      ...prev,
      { productId, quantity, title, price, totalPrice: price * quantity },
    ]);
  };

  const handleLocalStorage = (newValue: Cart) => {
    const data = localStorage.getItem("carts") || "[]";
    if (data) {
      localStorage.setItem(
        "carts",
        JSON.stringify([...JSON.parse(data), newValue])
      );
      return;
    }
    localStorage.setItem("carts", JSON.stringify([newValue]));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    if (datas.length <= 0) {
      setSnackbar({
        open: true,
        message: "Cart Empty",
        severity: "error",
      });
      setIsLoading(true);
      return;
    }

    try {
      const user: User = JSON.parse(localStorage.getItem("user") || "{}");
      const resp = await addCart({
        userId: user.id || 1,
        products: datas.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      const data = await resp.json();

      setSnackbar({
        open: true,
        message: "Create Cart Success",
        severity: "success",
      });

      handleLocalStorage({
        ...data,
        date: String(moment()),
      });
    } catch (err) {
      let mess = "Unknown Error";
      if (err instanceof Error) mess = err.message;
      setSnackbar({
        open: true,
        message: mess,
        severity: "error",
      });
    } finally {
      setIsLoading(true);
      router.push("/dashboard/cart");
    }
  };

  const handleOnClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return {
    datas,
    isLoading,
    products,
    snackbar,
    handleAddProduct,
    handleDeleteProduct,
    handleOnClose,
    handleSubmit,
  };
};

export default useCreate;

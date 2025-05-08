"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Product, ProductDetail } from "../../../../../types/carts";
import { addCart, getProducts } from "../../../../../services/carts";

import { isDuplicate, isLessThanZero } from "./functions";

const useCreate = () => {
  const router = useRouter();

  const [datas, setDatas] = useState<Product[]>([]);
  const [products, setProducts] = useState<ProductDetail[]>([]);

  const [snackbar, setSnackbar] = useState<any>({
    open: false,
    message: "",
    severity: "",
  });

  const getAllProducts = async () => {
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

  const handleSubmit = async () => {
    try {
      await addCart({
        userId: 1,
        products: datas.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      });

      setSnackbar({
        open: true,
        message: "Create Cart Success",
        severity: "success",
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
    products,
    snackbar,
    handleAddProduct,
    handleDeleteProduct,
    handleOnClose,
    handleSubmit,
  };
};

export default useCreate;

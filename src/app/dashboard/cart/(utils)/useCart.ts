"use client";

import { useEffect, useState } from "react";

import { getCarts } from "../../../../services/carts";
import { Cart } from "../../../../types/carts";

const useCart = () => {
  const [datas, setDatas] = useState<Cart[]>([]);
  const [pagination, setPagination] = useState({
    pageNo: 0,
    pageSize: 5,
  });

  const [snackbar, setSnackbar] = useState<any>({
    open: false,
    message: "",
    severity: "",
  });

  const [modal, setModal] = useState<{
    openModal: boolean;
    selectedData: Cart;
  }>({
    openModal: false,
    selectedData: {},
  });

  const getDatas = async () => {
    try {
      const resp = await getCarts();
      const data = await resp.json();

      setDatas(data);
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

  const handleOnPageChange = (_: any, newPage: number) => {
    setPagination((prev) => ({ ...prev, pageNo: newPage }));
  };

  const handleOnRowsPerPageChange = (event: any) => {
    setPagination({
      pageNo: 0,
      pageSize: event.target.value,
    });
  };

  const handleModalOpen = (values: Cart) => {
    setModal({
      openModal: true,
      selectedData: values,
    });
  };

  const handleModalClose = () => {
    setModal({
      openModal: false,
      selectedData: {},
    });
  };

  const handleOnCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    getDatas();
  }, []);

  return {
    datas,
    modal,
    pagination,
    snackbar,
    handleModalClose,
    handleModalOpen,
    handleOnCloseSnackbar,
    handleOnPageChange,
    handleOnRowsPerPageChange,
  };
};

export default useCart;

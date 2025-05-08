"use client";

import moment, { Moment } from "moment";
import { useEffect, useState } from "react";
import { PickerRangeValue } from "@mui/x-date-pickers/internals";

import { getCarts } from "../../../../services/carts";
import { Cart } from "../../../../types/carts";

import { getDataByDateRange } from "./functions";

const useCart = () => {
  const [datas, setDatas] = useState<Cart[]>([]);
  const [pagination, setPagination] = useState({
    pageNo: 0,
    pageSize: 5,
  });
  const [search, setSearch] = useState<{
    date: [Moment | null, Moment | null];
  }>({
    date: [null, null],
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
      const data: Cart[] = await resp.json();

      const lsData = localStorage.getItem("carts") || "[]";

      setDatas(
        [...JSON.parse(lsData), ...data].sort(
          (a, b) => moment(b.date).unix() - moment(a.date).unix()
        )
      );
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

  const handleDateOnChange = (newValue: PickerRangeValue) => {
    setSearch((prev) => ({ ...prev, date: newValue }));
  };

  useEffect(() => {
    getDatas();
  }, []);

  return {
    datas: getDataByDateRange(datas, search),
    modal,
    pagination,
    search,
    snackbar,
    handleDateOnChange,
    handleModalClose,
    handleModalOpen,
    handleOnCloseSnackbar,
    handleOnPageChange,
    handleOnRowsPerPageChange,
  };
};

export default useCart;

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

  const getDatas = async () => {
    try {
      const resp = await getCarts();
      const data = await resp.json();
      console.log("HADISINI_DATA", data, resp);
      setDatas(data);
    } catch (err) {
      let mess = "Unknown Error";
      if (err instanceof Error) mess = err.message;
      console.log("HADISINI_ERR CARTS", mess);
      // setSnackbar({
      //   open: true,
      //   message: mess,
      //   severity: "error",
      // });
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

  useEffect(() => {
    getDatas();
  }, []);

  return {
    datas,
    pagination,
    handleOnPageChange,
    handleOnRowsPerPageChange,
  };
};

export default useCart;

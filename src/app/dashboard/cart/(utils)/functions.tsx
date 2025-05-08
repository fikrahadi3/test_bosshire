import moment from "moment";
import { Button } from "@mui/material";

export const getDataPerPage = (datas: any[], pagination: any) => {
  return datas.slice(
    pagination.pageNo * pagination.pageSize,
    pagination.pageNo * pagination.pageSize + pagination.pageSize
  );
};

export const renderDate = (date: string) => {
  return moment(date).format("DD MMM YYYY - hh:mm:ss");
};

export const renderProducts = () => {
  return (
    <Button variant="outlined" onClick={() => console.log("HADISINI_CLICK")}>
      Show
    </Button>
  );
};

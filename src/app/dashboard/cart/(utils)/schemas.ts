import { renderDate, renderPrice } from "./functions";
import { TableSchema } from "./types";

export const TABLE_SCHEMA: TableSchema[] = [
  {
    label: "ID",
    key: "id",
    align: "center",
  },
  {
    label: "User ID",
    key: "userId",
    align: "center",
  },
  {
    label: "Date",
    key: "date",
    align: "center",
    render: renderDate,
  },
];

export const TABLE_MODAL_SCHEMA: TableSchema[] = [
  {
    label: "ID",
    key: "productId",
    align: "center",
  },
  {
    label: "Quantity",
    key: "quantity",
    align: "center",
  },
];

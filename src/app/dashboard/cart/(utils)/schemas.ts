import { renderDate, renderProducts } from "./functions";
import { TableSchema } from "./types";

export const TABLE_SCHEMA: TableSchema[] = [
  {
    label: "ID",
    key: "id",
    align: "center",
  },
  {
    label: "User",
    key: "userId",
    align: "center",
  },
  {
    label: "Date",
    key: "date",
    align: "center",
    render: renderDate,
  },
  {
    label: "Products",
    key: "[products, productId]",
    align: "center",
    render: renderProducts,
  },
];

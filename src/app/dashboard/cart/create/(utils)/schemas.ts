import { renderPrice } from "./functions";
import { TableSchema } from "./types";

export const TABLE_SCHEMA: TableSchema[] = [
  {
    label: "ID",
    key: "productId",
    align: "center",
  },
  {
    label: "Name",
    key: "title",
    align: "left",
  },
  {
    label: "Quantity",
    key: "quantity",
    align: "center",
  },
  {
    label: "Price",
    key: "price",
    align: "right",
    render: renderPrice,
  },
  {
    label: "Total Price",
    key: "totalPrice",
    align: "right",
    render: renderPrice,
  },
];

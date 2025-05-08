import { TableCellProps } from "@mui/material";

export type TableSchema = TableCellProps & {
  label: string;
  key: string;
  render?: (value: string) => string | React.ReactElement;
};

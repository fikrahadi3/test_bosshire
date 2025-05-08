"use client";

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

import { getDataPerPage } from "./(utils)/functions";
import { TABLE_SCHEMA } from "./(utils)/schemas";
import styles from "./(utils)/styles.module.scss";
import useCart from "./(utils)/useCart";

const Cart = () => {
  const { datas, pagination, handleOnPageChange, handleOnRowsPerPageChange } =
    useCart();

  return (
    <div className={styles.cart__container}>
      <Card className={styles.cart__content}>
        <Box className={styles.content__table}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {TABLE_SCHEMA.map((column) => (
                    <TableCell key={column.key} align="center">
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {getDataPerPage(datas, pagination).map((row) => {
                  return (
                    <TableRow tabIndex={-1} key={`${row.id}-${row.title}`}>
                      {TABLE_SCHEMA.map(({ key, align, render }) => {
                        const value = row[key];

                        return (
                          <TableCell key={key} align={align}>
                            {render ? render(value) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={datas.length}
            rowsPerPage={pagination.pageSize}
            page={pagination.pageNo}
            onPageChange={handleOnPageChange}
            onRowsPerPageChange={handleOnRowsPerPageChange}
          />
        </Box>
      </Card>
    </div>
  );
};

export default Cart;

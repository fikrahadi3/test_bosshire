"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Modal,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { DateRangePicker, LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterMoment } from "@mui/x-date-pickers-pro/AdapterMoment";

import { Product } from "../../../types/carts";

import { getDataPerPage, renderDate } from "./(utils)/functions";
import { TABLE_MODAL_SCHEMA, TABLE_SCHEMA } from "./(utils)/schemas";
import styles from "./(utils)/styles.module.scss";
import useCart from "./(utils)/useCart";

const Cart = () => {
  const {
    datas,
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
  } = useCart();

  const {
    openModal,
    selectedData: { products, userId, date },
  } = modal;

  const { open, message, severity } = snackbar;

  return (
    <div className={styles.cart__container}>
      <Card className={styles.cart__content}>
        <Box className={styles.content__search}>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateRangePicker
              className={styles.datePicker}
              value={search.date}
              onChange={(newValue) => handleDateOnChange(newValue)}
              slotProps={{ field: { clearable: true } }}
            />
          </LocalizationProvider>
        </Box>
        <Divider />
        <Box className={styles.content__table}>
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {TABLE_SCHEMA.map((column) => (
                    <TableCell
                      className={styles.table__head}
                      key={column.key}
                      align="center"
                    >
                      {column.label}
                    </TableCell>
                  ))}
                  <TableCell className={styles.table__head} align="center">
                    Products
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {getDataPerPage(datas, pagination).map((row, index) => {
                  return (
                    <TableRow
                      tabIndex={-1}
                      key={`${row.id}-${row.userId}-${index}`}
                    >
                      {TABLE_SCHEMA.map(({ key, align, render }) => {
                        const value = row[key];

                        return (
                          <TableCell
                            className={styles.table__body}
                            key={key}
                            align={align}
                          >
                            {render ? render(value) : value}
                          </TableCell>
                        );
                      })}

                      <TableCell className={styles.table__body} align="center">
                        <Button
                          variant="outlined"
                          onClick={() => handleModalOpen(row)}
                        >
                          Show Detail
                        </Button>
                      </TableCell>
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
      <Modal
        className={styles.modal__container}
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card className={styles.modal__content}>
          <h3>Products Detail</h3>
          <p>User ID: {userId}</p>
          <p>Date: {renderDate(date || "")}</p>

          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {TABLE_MODAL_SCHEMA.map((column) => (
                    <TableCell key={column.key} align="center">
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {products?.map((row: Product) => {
                  return (
                    <TableRow tabIndex={-1} key={`${row.productId}-table}`}>
                      {TABLE_MODAL_SCHEMA.map(({ key, align, render }) => {
                        const value = row?.[key as keyof Product] || "";

                        return (
                          <TableCell key={key} align={align}>
                            {render ? render(String(value)) : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      </Modal>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
      >
        <Alert
          severity={severity}
          variant="filled"
          onClose={handleOnCloseSnackbar}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Cart;

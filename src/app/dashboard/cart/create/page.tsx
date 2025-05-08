"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import styles from "./(utils)/styles.module.scss";
import { TABLE_SCHEMA } from "./(utils)/schemas";
import { randomUUID } from "crypto";
import useCreate from "./(utils)/useCreate";
import ProductCard from "../../../../components/ProductCard";
import { Product } from "../../../../types/carts";

const CreateCart = () => {
  const {
    datas,
    products,
    snackbar,
    handleAddProduct,
    handleOnClose,
    handleSubmit,
  } = useCreate();

  const { open, message, severity } = snackbar;

  return (
    <div className={styles.createCart__container}>
      <Card className={styles.createCart__content}>
        <Box className={styles.content__head}>
          <h2 className={styles.head__title}>Create Cart</h2>
          <Button
            className={styles.head__submit}
            variant="outlined"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
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
                {datas.length > 0 ? (
                  datas.map((row) => {
                    return (
                      <TableRow tabIndex={-1} key={`${randomUUID}}`}>
                        {TABLE_SCHEMA.map(({ key, align, render }) => {
                          const value = row?.[key as keyof Product] || "";

                          return (
                            <TableCell key={key} align={align}>
                              {render ? render(String(value)) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow tabIndex={-1}>
                    <TableCell colSpan={5}>No Data</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className={styles.content__head}>
          <h2 className={styles.head__title}>Products</h2>
        </Box>
        <Grid className={styles.content__products} container spacing={2}>
          {products.map((item) => (
            <Grid key={item.title} size={3}>
              <ProductCard
                {...item}
                handleAddProduct={handleAddProduct}
                isEditable
              />
            </Grid>
          ))}
        </Grid>
      </Card>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={500}
        open={open}
      >
        <Alert severity={severity} variant="filled" onClose={handleOnClose}>
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateCart;

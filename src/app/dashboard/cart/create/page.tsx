"use client";

import { DeleteOutlineOutlined } from "@mui/icons-material";
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

import Loading from "../../../../components/Loading";
import ProductCard from "../../../../components/ProductCard";
import { Product } from "../../../../types/carts";

import { TABLE_SCHEMA } from "./(utils)/schemas";
import styles from "./(utils)/styles.module.scss";
import useCreate from "./(utils)/useCreate";

const CreateCart = () => {
  const {
    datas,
    isLoading,
    products,
    snackbar,
    handleAddProduct,
    handleDeleteProduct,
    handleOnClose,
    handleSubmit,
  } = useCreate();

  const { open, message, severity } = snackbar;

  return (
    <>
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
                    {TABLE_SCHEMA.map(({ key, label }) => (
                      <TableCell key={`${key}-head`} align="center">
                        {label}
                      </TableCell>
                    ))}
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {datas.length > 0 ? (
                    datas.map((row, index) => {
                      return (
                        <TableRow tabIndex={-1} key={`${row.productId}-cart}`}>
                          {TABLE_SCHEMA.map(({ key, align, render }) => {
                            const value = row?.[key as keyof Product] || "";

                            return (
                              <TableCell
                                key={`${key}-${index}-cell`}
                                align={align}
                              >
                                {render ? render(String(value)) : value}
                              </TableCell>
                            );
                          })}
                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              startIcon={<DeleteOutlineOutlined />}
                              onClick={() => handleDeleteProduct(row.productId)}
                            >
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow tabIndex={-1}>
                      <TableCell colSpan={6}>No Data</TableCell>
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
      {isLoading && <Loading />}
    </>
  );
};

export default CreateCart;

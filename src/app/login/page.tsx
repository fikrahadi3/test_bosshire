"use client";

import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
  Snackbar,
  TextField,
} from "@mui/material";

import styles from "./styles.module.scss";
import useLogin from "./(utils)/useLogin";
import Loading from "../../components/Loading";

// TODO: Change any, auto hide snackbar, delete console
const Login = () => {
  const { isLoading, snackbar, handleOnChange, handleOnClose, handleOnSubmit } =
    useLogin();

  const { open, message, severity } = snackbar;

  return (
    <>
      <main className={styles.login__container}>
        <div className={styles.login__content}>
          <Card className={styles.content__card} variant="outlined">
            <h2 className={styles.card__title}>Login</h2>
            <Divider orientation="horizontal" flexItem />
            <Box
              className={styles.card__form}
              component="form"
              onSubmit={handleOnSubmit}
            >
              <TextField
                required
                className={styles.username}
                name="username"
                label="Username"
                variant="outlined"
                onChange={handleOnChange}
              />
              <TextField
                required
                className={styles.password}
                name="password"
                label="Password"
                variant="outlined"
                onChange={handleOnChange}
              />
              <Button
                className={styles.submit}
                size="large"
                variant="outlined"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Box>
          </Card>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={open}
        >
          <Alert severity={severity} variant="filled" onClose={handleOnClose}>
            {message}
          </Alert>
        </Snackbar>
      </main>
      {isLoading && <Loading />}
    </>
  );
};

export default Login;

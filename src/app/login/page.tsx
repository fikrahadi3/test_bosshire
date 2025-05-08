"use client";

import { FormEvent, useState } from "react";
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

// TODO: Change any, auto hide snackbar, delete console
const Login = () => {
  const [formData, setFormData] = useState<any>({
    username: "",
    password: "",
  });

  const [snackbar, setSnackbar] = useState<any>({
    open: false,
    message: "",
    severity: "",
  });

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log("HADISINI_SUBMIT");
    event.preventDefault();

    try {
      let headers = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");

      const resp = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        body: JSON.stringify(formData),
        headers,
      });

      const data = await resp.json();
      console.log("HADISINI_DATA", data);
      setSnackbar({
        open: true,
        message: "Login Success",
        severity: "success",
      });
    } catch (err) {
      let mess = "Unknown Error";
      if (err instanceof Error) mess = err.message;
      setSnackbar({
        open: true,
        message: mess,
        severity: "error",
      });
    }
  };

  const handleOnChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnClose = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const { open, message, severity } = snackbar;

  return (
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
        autoHideDuration={500}
        open={open}
      >
        <Alert severity={severity} variant="filled" onClose={handleOnClose}>
          {message}
        </Alert>
      </Snackbar>
    </main>
  );
};

export default Login;

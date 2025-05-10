"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Avatar } from "@mui/material";

import { User } from "../../types/user";

import styles from "./utils/styles.module.scss";

const Navbar = () => {
  const [name, setName] = useState("");

  const getName = () => {
    const user = localStorage.getItem("user");
    if (user) {
      const {
        name: { firstname, lastname },
      }: User = JSON.parse(user);
      setName(`${firstname || ""} ${lastname || ""}`);
      return;
    }
    setName("");
  };

  useEffect(() => {
    getName();
  }, [location.pathname]);

  return (
    <header className={styles.navbar__container}>
      <div className={styles.navbar__content}>
        <div className={styles.content__left}>Logo</div>
        <div className={styles.content__right}>
          {name ? (
            <Link className={styles.links} href={"/dashboard/cart"}>
              <p>Hi, {name}</p>
              <Avatar alt="profile" src="/images/profile-1.jpeg" />
            </Link>
          ) : (
            <Link className={styles.links} href={"/login"}>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

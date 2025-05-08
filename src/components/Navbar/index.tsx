"use client";

import { Avatar } from "@mui/material";

import { getCookie } from "../../shared/cookies";

import styles from "./utils/styles.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [name, setName] = useState("");

  const getName = async () => {
    const username = await getCookie("username");
    setName(String(username?.value || ""));
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <header className={styles.navbar__container}>
      <div className={styles.navbar__content}>
        <div className={styles.content__left}>Logo</div>
        <div className={styles.content__right}>
          {name ? (
            <>
              <p>Hi, {name}</p>
              <Avatar alt="profile" src="/images/profile-1.jpeg" />
            </>
          ) : (
            <Link href={"/login"}>Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

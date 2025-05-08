"use client";

import Link from "next/link";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { logout } from "../../shared/cookies";

import { MENU_LISTS } from "./utils/constants";
import styles from "./utils/styles.module.scss";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem("carts");
    localStorage.removeItem("user");
    router.push("/login");
  };

  return (
    <div className={styles.sidebar__container}>
      <Box className={styles.sidebar__content} role="presentation">
        <List className={styles.content__list}>
          {MENU_LISTS.map(({ name, key, link }) => (
            <Link href={link} key={key}>
              <ListItem className={styles.list__item}>
                <ListItemButton className={styles.item__button}>
                  <ListItemText className={styles.item__text} primary={name} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
          <ListItem className={styles.list__item}>
            <ListItemButton
              className={styles.item__button}
              onClick={handleLogout}
            >
              <ListItemText className={styles.item__text} primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );
};

export default Sidebar;

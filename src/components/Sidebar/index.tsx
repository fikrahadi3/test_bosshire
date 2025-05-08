"use client";

import Link from "next/link";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import { MENU_LISTS } from "./utils/constants";
import styles from "./utils/styles.module.scss";

const Sidebar = () => {
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
        </List>
      </Box>
    </div>
  );
};

export default Sidebar;

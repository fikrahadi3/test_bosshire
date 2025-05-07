import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { MENU_LISTS } from "./utils/constants";

import styles from "./utils/styles.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar__container}>
      <Box className={styles.sidebar__content} role="presentation">
        <List className={styles.content__list}>
          {MENU_LISTS.map(({ name, key }) => (
            <ListItem className={styles.list__item} key={key}>
              <ListItemButton className={styles.item__button}>
                {/* <ListItemIcon className={styles.item__icon}>{icon}</ListItemIcon> */}
                <ListItemText className={styles.item__text} primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default Sidebar;

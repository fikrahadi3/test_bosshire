import { Avatar } from "@mui/material";

import styles from "./utils/styles.module.scss";

const Navbar = () => {
  return (
    <header className={styles.navbar__container}>
      <div className={styles.navbar__content}>
        <div className={styles.content__left}>Logo</div>
        <div className={styles.content__right}>
          <Avatar alt="profile" src="/images/profile-1.jpeg" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;

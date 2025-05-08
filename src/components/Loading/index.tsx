import styles from "./utils/styles.module.scss";

const Loading = () => {
  return (
    <div className={styles.loading__container}>
      <div className={styles.loading__content}>
        <div className={styles.content__spinner}></div>
      </div>
    </div>
  );
};

export default Loading;

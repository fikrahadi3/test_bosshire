import Sidebar from "../../components/Sidebar";

import styles from "./styles.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={styles.dashboard__container}>
      <div className={styles.dashboard__content}>
        <Sidebar />
        {children}
      </div>
    </main>
  );
}

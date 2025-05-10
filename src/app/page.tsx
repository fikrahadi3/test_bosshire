import Link from "next/link";
import styles from "./styles.module.scss";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <h1>Welcome</h1>
        <h3>BossHire Test by Fikra Hadi Ramadhan</h3>
        <Link href={"/login"}>Login Here</Link>
      </div>
    </main>
  );
}

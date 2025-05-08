"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import { checkCookie } from "../../shared/cookies";

import styles from "./styles.module.scss";

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const checkIsAlreadyLogin = async () => {
    setIsLoading(true);
    const isAlreadyLogin = await checkCookie();
    if (!isAlreadyLogin) {
      setTimeout(() => router.push("/login"), 2000);
      return;
    }
    setTimeout(() => setIsLoading(false), 2000);
  };

  useEffect(() => {
    checkIsAlreadyLogin();
  }, []);

  return (
    <>
      <main className={styles.dashboard__container}>
        <div className={styles.dashboard__content}>
          <Sidebar />
          {children}
        </div>
      </main>
      {isLoading && <Loading />}
    </>
  );
}

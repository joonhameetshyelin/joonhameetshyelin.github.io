import Head from "next/head";
import styles from "@/styles/Home.module.css";

import { Cover } from "@/components/Cover";
import { Main } from "@/components/Main";
import { useState, useEffect } from "react";

export default function Home() {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden"; // 스크롤 활성화
    } else {
      document.body.style.overflow = "auto"; // 스크롤 비활성화
    }

    // 컴포넌트 언마운트 시 원래 상태로 복구
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [visible]);

  const handleCoverClick = () => setVisible(false); // Cover 클릭 시 숨김

  return (
    <>
      <Head>
        <meta name="description" content="2025년 2월 9일 일요일, 결혼합니다." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.page}`}>
        <main className={styles.main}>
          <div className={`invitation_container`}>
            <Cover visible={visible} handleCoverClick={handleCoverClick} />
            <Main visible={visible} />
          </div>
        </main>
      </div>
    </>
  );
}

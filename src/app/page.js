"use client";
import { useState } from "react";

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Popup from "../components/Popup";
import PopupJSON from "../components/PopupJSON";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className={styles.main}>
      {count === 1 ? <Popup /> : ""}
      {count === 2 ? <PopupJSON /> : ""}
      <div className={styles.containerPrincipal}>
        <h1>Transforme e simplifique</h1>
        <Image
          src="/banner.svg"
          alt="Banner Apresentacao"
          className={styles.vercelLogo}
          width={759}
          height={506}
          priority
        />
      </div>
      <div className={styles.containerBotoes}>
        <button className={styles.btnInformacoes} onClick={() => setCount(1)}>
          Conveter excel para CSV
        </button>
        <button className={styles.btnInformacoes} onClick={() => setCount(2)}>
          Conveter excel para JSON
        </button>
      </div>
    </main>
  );
}

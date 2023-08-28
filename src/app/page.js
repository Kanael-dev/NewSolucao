"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Popup from "../components/Popup";
import PopupJSON from "../components/PopupJSON";
import PopupXLSX from "../components/PopupJSON";

export default function Home() {
  const [count, setCount] = useState(0);

  const handlerParams = (valor) => {
    setCount(valor);
  };

  return (
    <main className={styles.main}>
      {count === 1 ? <Popup handlerParams={handlerParams} /> : ""}
      {count === 2 ? <PopupJSON handlerParams={handlerParams} /> : ""}
      {count === 3 ? <PopupJSON handlerParams={handlerParams} /> : ""}
      <div className={styles.containerPrincipal}>
        <div className={styles.containerApresentacao}>
          <h1 className={styles.textTitulo}>simplifique o processo!</h1>
          <p className={styles.textExemplo}>
            iProcess facilitando sua vida! 🥰👌
          </p>
        </div>
        <div className={styles.containerOpcoes}>
          <div
            className={styles.containerItems}
            onClick={() => {
              handlerParams(1);
            }}
          >
            <Image
              src="/apertodemao.jpg"
              alt="Banner Apresentacao"
              className={styles.image}
              width={50}
              height={50}
              priority
            />

            <p>Transformar excel para CSV</p>
          </div>
          <div
            className={styles.containerItems}
            onClick={() => {
              handlerParams(2);
            }}
          >
            <div>
              <Image
                src="/apertodemao.jpg"
                alt="Banner Apresentacao"
                className={styles.image}
                width={50}
                height={50}
                priority
              />
            </div>
            <div>
              <p>Transformar excel para JSON</p>
            </div>
          </div>
          <div className={styles.containerItems}
          onClick={() => {
            handlerParams(3);
          }}>
            <div>
              <Image
                src="/apertodemao.jpg"
                alt="Banner Apresentacao"
                className={styles.image}
                width={50}
                height={50}
                priority
              />
            </div>
            <div>
              <p>Transformar JSON para excel</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
  // return (
  //   <main className={styles.main}>
  //     {count === 1 ? <Popup handlerParams={handlerParams}/> : ""}
  //     {count === 2 ? <PopupJSON handlerParams={handlerParams}/> : ""}
  //     <div className={styles.containerPrincipal}>
  //       <h1>Transforme e simplifique</h1>
  //       <Image
  //         src="/banner.svg"
  //         alt="Banner Apresentacao"
  //         className={styles.vercelLogo}
  //         width={759}
  //         height={506}
  //         priority
  //       />
  //     </div>
  //     <div className={styles.containerBotoes}>
  //       <button
  //         className={styles.btnInformacoes}
  //         onClick={() => {
  //           handlerParams(1);
  //         }}
  //       >
  //         Conveter excel para CSV
  //       </button>
  //       <button
  //         className={styles.btnInformacoes}
  //         onClick={() => {
  //           handlerParams(2);
  //         }}
  //       >
  //         Conveter excel para JSON
  //       </button>
  //     </div>
  //   </main>
  // );
}

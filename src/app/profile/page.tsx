"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import styles from "./profile.module.scss";

// Popup useContext
import { usePopupContext } from "../contexts/PopupContext";
// Popup Content
import DeleteAccount from "../components/Popup/DeleteAccount";

export default function Page() {
  const { openPopup } = usePopupContext();
  const [travelerCode, setTravelerCode] = useState("000000000000");

  useEffect(() => {
    generateQRCode(travelerCode);
  }, [travelerCode]);

  function generateQRCode(code: string) {
    const qrCodeContainer = document.getElementById("qrCodeContainer");
    QRCode.toCanvas(qrCodeContainer, code, { width: 150 });
  }

  function refreshCode() {
    const newCode = generateRandomCode();
    setTravelerCode(newCode);
  }

  function generateRandomCode() {
    const randomNumber = Math.floor(Math.random() * 1000000000000);
    return String(randomNumber).padStart(12, "0");
  }

  return (
    <div className={`page_container ${styles.profle_main}`}>
      <canvas id="qrCodeContainer" className={styles.qr_box}></canvas>
      <h4>Your Traveler Code :</h4>
      <div className={styles.traveler_num}>{travelerCode}</div>
      <span>Expired in 2:59</span>
      <div className={styles.refresh_button} onClick={refreshCode}>
        <div>
          <Image src="/refresh.svg" alt="refresh icon" width="16" height="16" />
          Refresh
        </div>
      </div>
      <div className="bottom_line_button">
        <div onClick={() => openPopup(<DeleteAccount />)}>Delete Account</div>
      </div>
    </div>
  );
}

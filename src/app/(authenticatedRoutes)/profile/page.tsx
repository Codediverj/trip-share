"use client";
import React, { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import QRCode from "qrcode";
import styles from "./profile.module.scss";

// Popup useContext
import { usePopupContext } from "../../../contexts/popup/PopupContext";
// Popup Content
import DeleteAccount from "../../components/Popup/DeleteAccount";

//type
import { UserData } from "./profile.types";

//Component
import GeneratedTravlerCode from "../../components/GenerateTravelerCode";

export default function ProfilePage() {
  const { openPopup } = usePopupContext();
  const supabase = createClientComponentClient();
  const [travelerCode, setTravelerCode] = useState("000000000000");
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    supabase
      .from("User")
      .select()
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }
        if (data) {
          setTravelerCode(data.traveler_code);
          setUserData(data);
        }
      });
  }, []);

  useEffect(() => {
    generateQRCode(travelerCode);
  }, [travelerCode]);

  function generateQRCode(code: string) {
    const qrCodeContainer = document.getElementById("qrCodeContainer");
    QRCode.toCanvas(qrCodeContainer, code, { width: 150 });
  }

  const handleRegenerateCode = () => {
    const newCode = GeneratedTravlerCode();
    if (!userData) {
      return;
    }
    supabase
      .from("User")
      .upsert({
        user_id: userData.user_id,
        profile_image: userData.profile_image,
        nickname: userData.nickname,
        email: userData.email,
        traveler_code: newCode,
      })
      .select()
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }
        if (data) {
          setUserData((prevData) => {
            if (prevData) {
              return { ...prevData, traveler_code: newCode };
            }
            return prevData;
          });
          setTravelerCode(newCode);
          generateQRCode(newCode);
        }
      });
  };

  const signOut = () => {
    supabase.auth.signOut();
    //redirect
  };

  // const handleSignOut = () => {
  //   //   const {
  //   //     data: { session },
  //   //   } = await supabase.auth.getSession();
  //   //   if (session) {
  //   //     await supabase.auth.signOut();
  //   //   }
  //   // };

  return (
    <div className={`page_container ${styles.profle_main}`}>
      <canvas id="qrCodeContainer" className={styles.qr_box}></canvas>
      <h4>Your Traveler Code :</h4>
      <div className={styles.traveler_num}>{travelerCode}</div>

      <div className={styles.refresh_button} onClick={handleRegenerateCode}>
        <div>
          <Image src="/refresh.svg" alt="refresh icon" width="16" height="16" />
          Regenerate
        </div>
      </div>
      <div className="bottom_line_button">
        <div className="blue" onClick={signOut}>
          Sign Out
        </div>
        <div className="red second" onClick={() => openPopup(<DeleteAccount />)}>
          Delete Account
        </div>
      </div>
    </div>
  );
}
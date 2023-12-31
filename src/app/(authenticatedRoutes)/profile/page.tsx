"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import QRCode from "qrcode";
import styles from "./profile.module.scss";

// Popup useContext
import { usePopupContext } from "../../../contexts/popup/PopupContext";
// Popup Content
import DeleteAccount from "../../../components/Popup/DeleteAccount";

//UserData(Context)
import { useUserDataStore } from "@/contexts/userData/userData.provider";

//Component
import GeneratedTravlerCode from "../../../components/GenerateTravelerCode";
import { Database } from "@/supabase.types";
import { User } from "@/app/api/user/user.types";
import { DateTime } from "luxon";

export default function ProfilePage() {
  const { openPopup } = usePopupContext();
  const supabase = createClientComponentClient<Database>();
  const [travelerCode, setTravelerCode] = useState("0000");
  const userData = useUserDataStore(); //server
  const [userDataState, setUserDataState] = useState(userData); //client
  const router = useRouter();

  useEffect(() => {
    if (!userData || !userData.userId) return;

    supabase
      .from("User")
      .select()
      .eq("user_id", userData.userId)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }
        if (data) {
          setTravelerCode(data.traveler_code);
          setUserDataState({
            userId: data.user_id,
            nickname: data.nickname,
            profileImage: data.profile_image || undefined,
            createdAt: DateTime.fromISO(data.created_at).toJSDate(),
            email: data.email,
            travelerCode: data.traveler_code,
          });
        }
      });
  }, [supabase, userData]);

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
      .update({
        //user_id: userData.userId,
        //profile_image: userData.profileImage,
        //nickname: userData.nickname,
        //email: userData.email,
        traveler_code: newCode,
        //created_at: userData.createdAt,
      })
      .eq("user_id", userData.userId)
      .select()
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }
        if (data) {
          setUserDataState((prevData) => {
            if (prevData) {
              return { ...prevData, travelerCode: newCode };
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
    router.push("/auth/login");
  };

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
        <button className="blue" onClick={signOut}>
          Sign Out
        </button>
        {/* <button className="red second" onClick={() => openPopup(<DeleteAccount />)}>
          Delete Account
        </button> */}
      </div>
    </div>
  );
}

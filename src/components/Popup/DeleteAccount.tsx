"use client";
import React, { useEffect } from "react";
import styles from "./Popup.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

//UserData(Context)
import { useUserDataStore } from "@/contexts/userData/userData.provider";
// Popup useContext
import { usePopupContext } from "../../contexts/popup/PopupContext";

export default function DeleteAccount() {
  const { closePopup } = usePopupContext();
  const supabase = createClientComponentClient();
  const userData = useUserDataStore(); //server

  const deleteAccount = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("User").delete().eq("user_id", user.id);
  };

  return (
    <div>
      <h2 className={styles.popupBox_title_center}>Are You Sure?</h2>
      <p className={styles.delete_notice}>
        <span>You will be lose all.</span>
        <span>Do you want to delete this account?</span>
      </p>
      <button
        className={`${styles.cancel_button} ${styles.popup_button_text}`}
        onClick={closePopup}
      >
        Cancel
      </button>
      <button
        className={`${styles.delete_button} ${styles.popup_button_text}`}
        onClick={deleteAccount}
      >
        Delete
      </button>
    </div>
  );
}

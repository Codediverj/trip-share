import React, { FormEvent } from "react";
import styles from "./Popup.module.scss";
import Image from "next/image";

// Popup useContext
import { usePopupContext } from "@/contexts/popup/PopupContext";
import { DayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.types";

export default function DeletePlan({ data }: { data: DayPlanDataStore[number] }) {
  const { closePopup } = usePopupContext();

  const deleteSinglePlan = (event: FormEvent) => {
    event.preventDefault();

    if (!data) {
      return;
    }

    fetch("/api/deleteSinglePlan", {
      method: "POST",
      body: JSON.stringify({
        singlePlanId: data.singlePlanId,
      }),
    }).then(() => closePopup());
  };

  return (
    <div>
      <h2 className={styles.popupBox_title_center}>Are You Sure?</h2>
      <p className={styles.delete_notice}>
        <span>Do you want to delete {data.placeFromName} plan?</span>
      </p>
      <button
        className={`${styles.cancel_button} ${styles.popup_button_text}`}
        onClick={() => closePopup()}
      >
        Cancel
      </button>
      <button
        className={`${styles.delete_button} ${styles.popup_button_text}`}
        onClick={deleteSinglePlan}
      >
        Delete
      </button>
    </div>
  );
}

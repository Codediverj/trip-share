"use client";
import React, { useState, useEffect } from "react";
import styles from "../Popup.module.scss";

// Popup useContext
import { usePopupContext } from "../../../contexts/popup/PopupContext";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { Moment } from "@/app/api/moment/moment.types";

export default function EditMoment() {
  const { closePopup } = usePopupContext();
  const userData = useUserDataStore(); //user context data
  const [planData, setPlanData] = useState<Omit<Moment, "planId">>({
    title: "",
    momentDate: new Date(),
    momentImage: "",
    memo: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setPlanData((prevPlanData) => ({
      ...prevPlanData,
      [name]: name === "startDate" || name === "endDate" ? new Date(value) : value,
    }));
  };

  const addNewPlan = () => {
    const { title, momentDate, momentImage, memo } = planData;
    if (!planData) {
      return;
    }
    fetch("/api/plan", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        momentDate: momentDate.toISOString().split("T")[0],
        momentImage: momentImage,
        memo: memo || undefined,
      }),
    }).then(() => closePopup());
  };

  return (
    <div>
      <h2 className={styles.popupBox_title}>Edit Moment</h2>

      <h3 className={styles.input_box_h3}>Title</h3>
      <input
        className={styles.input_box}
        type="text"
        placeholder="Moment Title"
        name="title"
        value={planData.title}
        onChange={handleInputChange}
      />

      <h3 className={styles.input_box_h3}>Date</h3>
      <div className={styles.find_input_box_date}>
        <input
          className={styles.input_box}
          type="date"
          placeholder="Select Date"
          name="momentDate"
          value={planData.momentDate.toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </div>

      <h3 className={styles.input_box_h3}>Image</h3>
      <div className={styles.find_input_box}>
        <input
          className={styles.input_box}
          type="text"
          placeholder="Moment Image"
          name="backgroundImage"
          value={planData.momentImage}
          onChange={handleInputChange}
        />
        <button>Find Image</button>
      </div>

      <h3 className={styles.input_box_h3}>Memo</h3>
      <textarea
        className={styles.input_box}
        placeholder="Type your moment..."
        name="memo"
        onChange={handleInputChange}
        value={planData.memo}
        rows={5}
      />

      <button
        className={`${styles.full_bg_button} ${styles.popup_button_text}`}
        onClick={addNewPlan}
      >
        Save
      </button>
    </div>
  );
}

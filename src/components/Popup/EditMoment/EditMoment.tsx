"use client";
import React, { useState } from "react";
import styles from "../Popup.module.scss";

// Popup useContext
import { usePopupContext } from "@/contexts/popup/PopupContext";
import { Moment } from "@/app/api/moment/moment.types";
import { MomentDataType } from "@/components/PlanPage/singleMoment.types";

export default function EditMoment({ data }: { data: MomentDataType }) {
  const { closePopup } = usePopupContext();
  const [momentData, setMomentData] = useState<Omit<Moment, "planId">>({
    id: data.id,
    title: data.title,
    momentDate: data.momentDate,
    momentImage: data.momentImage,
    memo: data.memo,
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setMomentData((prevMomentData) => ({
      ...prevMomentData,
      [name]: name === "momentDate" ? new Date(value) : value,
    }));
  };

  const editMoment = () => {
    const { id, title, momentDate, momentImage, memo } = momentData;
    if (!momentData) {
      return;
    }
    fetch("/api/updateMoment", {
      method: "POST",
      body: JSON.stringify({
        id: id,
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
        value={momentData.title}
        onChange={handleInputChange}
      />

      <h3 className={styles.input_box_h3}>Date</h3>
      <div className={styles.find_input_box_date}>
        <input
          className={styles.input_box}
          type="date"
          placeholder="Select Date"
          name="momentDate"
          value={momentData.momentDate.toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </div>

      <h3 className={styles.input_box_h3}>Image</h3>
      <div className={styles.find_input_box}>
        <input
          className={styles.input_box}
          type="text"
          placeholder="Moment Image"
          name="momentImage"
          value={momentData.momentImage}
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
        value={momentData.memo}
        rows={5}
      />

      <button
        className={`${styles.full_bg_button} ${styles.popup_button_text}`}
        onClick={editMoment}
      >
        Save
      </button>
    </div>
  );
}

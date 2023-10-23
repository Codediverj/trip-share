"use client";
import React, { useState } from "react";
import styles from "../Popup.module.scss";

// Popup useContext
import { usePopupContext } from "@/contexts/popup/PopupContext";
import { Moment } from "@/app/api/moment/moment.types";
import { MomentDataType } from "@/components/PlanPage/singleMoment.types";

//input components
import DefaultText from "@/components/Form/DefaultText";
import DateInput from "@/components/Form/DateInput";
import ImageSelectInput from "@/components/Form/ImageSelectInput";
import LongTextBox from "@/components/Form/LongTextBox";

export default function EditMoment({ data }: { data: MomentDataType }) {
  const { closePopup } = usePopupContext();
  const [titleErrorMessage, setTitleErrorMessage] = useState<string>("");
  const [memoErrorMessage, setMemoErrorMessage] = useState<string>("");
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
    let hasError = false;
    if (title === "" || undefined) {
      setTitleErrorMessage("This field cannot be empty.");
      hasError = true;
    }
    if (memo === "" || undefined) {
      setMemoErrorMessage("This field cannot be empty.");
      hasError = true;
    }
    if (hasError) {
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
      <DefaultText
        name="title"
        value={momentData.title}
        onChange={handleInputChange}
        placeholder={"Moment Title"}
        errorMessage={titleErrorMessage}
      />

      <h3 className={styles.input_box_h3}>Date</h3>
      <DateInput
        name="momentDate"
        value={momentData.momentDate.toISOString().split("T")[0]}
        onChange={handleInputChange}
      />

      <h3 className={styles.input_box_h3}>Image</h3>
      <ImageSelectInput
        name={"momentImage"}
        value={momentData.momentImage}
        onChange={handleInputChange}
      />

      <h3 className={styles.input_box_h3}>Memo</h3>
      <LongTextBox
        placeholder="Type your moment..."
        name="memo"
        onChange={handleInputChange}
        value={momentData.memo}
        rows={5}
        errorMessage={memoErrorMessage}
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

"use client";
import React, { useState } from "react";
import styles from "./Popup.module.scss";

// Popup useContext
import { usePopupContext } from "../../contexts/popup/PopupContext";
import { Plan } from "@/app/api/plan/plan.types";

//input component
import DefaultText from "../Form/DefaultText";
import DateInput from "../Form/DateInput";
import ImageSelectInput from "../Form/ImageSelectInput";

export default function AddNewPlan() {
  const { closePopup } = usePopupContext();
  const [planData, setPlanData] = useState<Omit<Plan, "planId">>({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    backgroundImage:
      "https://images.unsplash.com/photo-1543158266-0066955047b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    currency: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setPlanData((prevPlanData) => ({
      ...prevPlanData,
      [name]: name === "startDate" || name === "endDate" ? new Date(value) : value,
    }));
  };

  const addNewPlan = () => {
    const { title, startDate, endDate, backgroundImage, currency } = planData;

    if (!planData) {
      return;
    }

    fetch("/api/plan", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        backgroundImage: backgroundImage,
        currency: currency || undefined,
      }),
    }).then(() => closePopup());
  };

  return (
    <div>
      <h2 className={styles.popupBox_title}>Add New Plan</h2>

      <h3 className={styles.input_box_h3}>Title</h3>
      <DefaultText
        name="title"
        value={planData.title}
        onChange={handleInputChange}
        placeholder={"Plan Title"}
      />

      <h3 className={styles.input_box_h3}>From</h3>
      <DateInput
        name="startDate"
        value={planData.startDate.toISOString().split("T")[0]}
        onChange={handleInputChange}
      />

      <h3 className={styles.input_box_h3}>To</h3>
      <DateInput
        name="endDate"
        value={planData.endDate.toISOString().split("T")[0]}
        onChange={handleInputChange}
      />

      <h3 className={styles.input_box_h3}>Background Image</h3>
      <ImageSelectInput
        name={"backgroundImage"}
        value={planData.backgroundImage}
        onChange={handleInputChange}
      />

      <h3 className={styles.input_box_h3}>Default Currency for this trip</h3>
      <DefaultText
        name="currency"
        value={planData.currency}
        onChange={handleInputChange}
        placeholder={"$ / ￥ / ₩ / €"}
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

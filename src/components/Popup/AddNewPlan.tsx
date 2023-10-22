"use client";
import React, { useEffect, useState } from "react";
import styles from "./Popup.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DateTime } from "luxon";

// Popup useContext
import { usePopupContext } from "../../contexts/popup/PopupContext";
import { Plan } from "@/app/api/plan/plan.types";

//input component
import DefaultText from "../Form/DefaultText";
import DateInput from "../Form/DateInput";
import ImageSelectInput from "../Form/ImageSelectInput";

export default function AddNewPlan() {
  const { closePopup } = usePopupContext();
  const supabase = createClientComponentClient();
  const [options, setOptions] = useState([]);
  const [titleErrorMessage, setTitleErrorMessage] = useState<string>("");
  const [fromErrorMessage, setFromErrorMessage] = useState<string>("");
  const [toErrorMessage, setToErrorMessage] = useState<string>("");

  useEffect(() => {
    supabase.rpc("currency_options").then((response) => {
      if (response.data) {
        setOptions(
          response.data.map((value: string, index: number) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))
        );
      }
    });
  }, [supabase]);

  const [planData, setPlanData] = useState<Omit<Plan, "planId">>({
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    backgroundImage:
      "https://images.unsplash.com/photo-1543158266-0066955047b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    currency: "USD",
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
    const startDateLuxon = DateTime.fromJSDate(startDate);
    const endDateLuxon = DateTime.fromJSDate(endDate);
    let hasError = false;

    if (!planData) {
      return;
    }

    if (title === "" || undefined) {
      setTitleErrorMessage("This field cannot be empty.");
      hasError = true;
    }
    if (startDate === null || undefined) {
      setFromErrorMessage("This field cannot be empty.");
      hasError = true;
    }
    if (endDateLuxon <= startDateLuxon) {
      setToErrorMessage("End date must be after the start date.");
      hasError = true;
    }
    if (hasError) {
      return;
    }

    fetch("/api/plan", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        backgroundImage: backgroundImage,
        currency: currency,
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
        errorMessage={titleErrorMessage}
      />

      <h3 className={styles.input_box_h3}>From</h3>
      <DateInput
        name="startDate"
        value={planData.startDate.toISOString().split("T")[0]}
        onChange={handleInputChange}
        errorMessage={fromErrorMessage}
      />

      <h3 className={styles.input_box_h3}>To</h3>
      <DateInput
        name="endDate"
        value={planData.endDate.toISOString().split("T")[0]}
        onChange={handleInputChange}
        errorMessage={toErrorMessage}
      />

      <h3 className={styles.input_box_h3}>Background Image</h3>
      <ImageSelectInput
        name={"backgroundImage"}
        value={planData.backgroundImage}
        onChange={handleInputChange}
      />

      <h3 className={styles.input_box_h3}>Default Currency for this trip</h3>
      <select
        className={styles.select_box}
        name="currency"
        onChange={handleInputChange}
        value={planData.currency}
      >
        {options}
      </select>

      <button
        className={`${styles.full_bg_button} ${styles.popup_button_text}`}
        onClick={addNewPlan}
      >
        Save
      </button>
    </div>
  );
}

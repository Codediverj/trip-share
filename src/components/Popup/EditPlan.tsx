"use client";
import React, { useEffect, useState } from "react";
import styles from "./Popup.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DateTime } from "luxon";

// Popup useContext
import { usePopupContext } from "../../contexts/popup/PopupContext";
import { usePlanDataStore } from "@/contexts/planData/planData.provider";
import { PlanDataStore } from "@/contexts/planData/planData.types";
import DefaultText from "../Form/DefaultText";
import DateInput from "../Form/DateInput";
import ImageSelectInput from "../Form/ImageSelectInput";

export default function EditPlan() {
  const { closePopup } = usePopupContext();
  const planContextData = usePlanDataStore();
  const [planData, setPlanData] = useState<PlanDataStore>(planContextData);
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

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setPlanData((prevPlanData) => ({
      ...prevPlanData,
      [name]: name === "startDate" || name === "endDate" ? new Date(value) : value,
    }));
  };

  const handleEditPlan = () => {
    const { planId, title, startDate, endDate, backgroundImage, currency } = planData;
    const startDateLuxon = DateTime.fromJSDate(startDate);
    const endDateLuxon = DateTime.fromJSDate(endDate);
    let hasError = false;

    if (!planData) {
      return;
    }

    if (!title || !title.trim()) {
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

    fetch("/api/updatePlan", {
      method: "POST",
      body: JSON.stringify({
        planId: planId,
        title: title,
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        backgroundImage: backgroundImage,
        currency: currency,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    });
    closePopup();
  };

  return (
    <div>
      <h2 className={styles.popupBox_title}>Edit Plan</h2>

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
        onClick={handleEditPlan}
      >
        Save
      </button>
    </div>
  );
}

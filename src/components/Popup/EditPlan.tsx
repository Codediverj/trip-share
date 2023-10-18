"use client";
import React, { useEffect, useState } from "react";
import styles from "./Popup.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
  useEffect(() => {
    supabase.rpc("hello_world").then((response) => {
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
    if (!planData) {
      return;
    }
    fetch("/api/updatePlan", {
      method: "POST",
      body: JSON.stringify({
        planId: planData.planId,
        title: planData.title,
        startDate: planData.startDate.toISOString().split("T")[0],
        endDate: planData.endDate.toISOString().split("T")[0],
        backgroundImage: planData.backgroundImage,
        currency: planData.currency || undefined,
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

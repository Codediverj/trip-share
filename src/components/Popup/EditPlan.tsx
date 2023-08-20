"use client";
import React, { useState } from "react";
import styles from "./Popup.module.scss";

// Popup useContext
import { usePopupContext } from "../../contexts/popup/PopupContext";
import { Plan } from "@/app/api/plan/plan.types";
import { usePlanDataStore } from "@/contexts/planData/planData.provider";
import { PlanDataStore } from "@/contexts/planData/planData.types";

export default function EditPlan() {
  const { closePopup } = usePopupContext();
  const planContextData = usePlanDataStore();
  const [planData, setPlanData] = useState<PlanDataStore>(planContextData);
  console.log(planData);

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
    // .then((data) => {
    //   console.log(planData);
    //   setPlanData((prevPlanData) => ({
    //     ...prevPlanData,
    //     planId: data.planId,
    //     title: data.title,
    //     startDate: new Date(data.startDate),
    //     endDate: new Date(data.endDate),
    //     backgroundImage: data.backgroundImage,
    //     currency: data.currency,
    //   }));
    //   closePopup();
    // });
    closePopup();
  };

  return (
    <div>
      <h2 className={styles.popupBox_title}>Edit Plan</h2>

      <h3 className={styles.input_box_h3}>Title</h3>
      <input
        className={styles.input_box}
        type="text"
        placeholder="Plan Title"
        name="title"
        value={planData.title}
        onChange={handleInputChange}
      />

      <h3 className={styles.input_box_h3}>From</h3>
      <div className={styles.find_input_box_date}>
        <input
          className={styles.input_box}
          type="date"
          placeholder="Select Date"
          name="startDate"
          value={planData.startDate.toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </div>

      <h3 className={styles.input_box_h3}>To</h3>
      <div className={styles.find_input_box_date}>
        <input
          className={styles.input_box}
          type="date"
          placeholder="Select Date"
          name="endDate"
          value={planData.endDate.toISOString().split("T")[0]}
          onChange={handleInputChange}
        />
      </div>

      <h3 className={styles.input_box_h3}>Background Image</h3>
      <div className={styles.find_input_box}>
        <input
          className={styles.input_box}
          type="text"
          placeholder="Profile Image"
          name="backgroundImage"
          value={planData.backgroundImage}
          onChange={handleInputChange}
        />
        <button>Find Image</button>
      </div>

      <h3 className={styles.input_box_h3}>Default Currency for this trip</h3>
      <input
        className={styles.input_box}
        type="text"
        placeholder="$ / ￥ / ₩ / €"
        name="currency"
        value={planData.currency}
        onChange={handleInputChange}
      />

      <button
        className={`${styles.full_bg_button} ${styles.popup_button_text}`}
        onClick={handleEditPlan}
      >
        Save
      </button>
    </div>
  );
}

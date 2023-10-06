"use client";
import React, { useState, FormEvent, useEffect } from "react";
import styles from "../Popup.module.scss";

// Popup useContext
import { usePopupContext } from "../../../contexts/popup/PopupContext";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { DayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.types";
import { SinglePlan } from "./EditSchedule.types";
import PersonalExpense from "./PersonalExpense";
import GroupExpense from "./GroupExpense";
import { findOutPaidUser } from "@/utils/findoutPaidUser.utils";
import { calculateExpense } from "@/utils/calculateExpense.utils";

export default function EditSchedule({ data }: { data: DayPlanDataStore[number] }) {
  const { closePopup } = usePopupContext();
  const userData = useUserDataStore();
  const [isNotMoving, setIsNotMoving] = useState(data.placeToName === undefined ? true : false);
  //const [isGroupPaid, setIsGroupPaid] = useState(false);

  const [isGroupPaid, setIsGroupPaid] = useState(() => {
    const initialValue = findOutPaidUser(
      data.isGroupActivity,
      data.Single_Plan_Expense,
      userData.userId
    );
    return initialValue === "" ? false : true;
  });

  const [planData, setPlanData] = useState<Omit<SinglePlan, "singlePlanId" | "planId">>(() => ({
    placeFromId: data.placeFromId,
    placeFromName: data.placeFromName,
    placeToId: data.placeToId,
    placeToName: data.placeToName,
    note: data.note,
    links: data.links,
    isGroupActivity: data.isGroupActivity,
    updatedAt: new Date(),
    updatedBy: userData.userId,
    expense: calculateExpense(data.isGroupActivity, data.Single_Plan_Expense),
    paidID: findOutPaidUser(data.isGroupActivity, data.Single_Plan_Expense, userData.userId),
  }));

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setPlanData((prevPlanData) => ({
      ...prevPlanData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setIsNotMoving(!isNotMoving);
    if (!isNotMoving) {
      setPlanData((prevPlanData) => ({
        ...prevPlanData,
        placeToId: "",
        placeToName: "",
      }));
    }
  };
  const handleRadioChange = (event: any) => {
    const { value } = event.target;
    setPlanData((prevData) => ({
      ...prevData,
      isGroupActivity: value === "group",
      expense: 0,
    }));
  };

  const editSinglePlan = (event: FormEvent) => {
    event.preventDefault();

    const {
      placeFromId,
      placeFromName,
      placeToId,
      placeToName,
      note,
      links,
      isGroupActivity,
      expense,
      updatedBy,
      paidID,
    } = planData;

    if (!planData) {
      return;
    }

    fetch("/api/updateSinglePlan", {
      method: "POST",
      body: JSON.stringify({
        planId: data.planId,
        singlePlanId: data.singlePlanId,
        placeFromId: placeFromId,
        placeFromName: placeFromName,
        placeToId: placeToId || undefined,
        placeToName: placeToName || undefined,
        note: note || undefined,
        links: links || undefined,
        updatedAt: new Date().toISOString().split("T")[0],
        updatedBy: updatedBy,
        isGroupActivity: isGroupActivity,
        expense: expense,
        paidID: paidID,
      }),
    }).then(() => closePopup());
  };

  return (
    <div>
      <form>
        <h2 className={styles.popupBox_title}>Edit Schedule</h2>

        <h3 className={styles.input_box_h3}>From</h3>
        <input
          className={styles.input_box}
          type="text"
          placeholder="Location"
          name="placeFromName"
          value={planData.placeFromName}
          onChange={handleInputChange}
        />

        <div className={`${styles.input_checkbox_wrap} ${isNotMoving ? styles.disabled : ""}`}>
          <h3 className={styles.input_box_h3}>To</h3>
          <label className={`${styles.input_disable_checkbox} ${styles.checkbox_label}`}>
            <input
              type="checkbox"
              checked={isNotMoving}
              onChange={handleCheckboxChange}
              className={styles.checkbox_input}
            />
            I am not moving
            <span
              className={`${styles.custom_checkbox} ${isNotMoving ? styles.clicked : ""}`}
            ></span>
          </label>

          <input
            className={styles.input_box}
            type="text"
            placeholder="Location"
            name="placeToName"
            onChange={handleInputChange}
            value={planData.placeToName}
            disabled={isNotMoving}
          />
        </div>

        <h3 className={styles.input_box_h3}>What are you going to do here?</h3>
        <textarea
          className={styles.input_box}
          placeholder="Type your Plan"
          name="note"
          onChange={handleInputChange}
          value={planData.note}
          rows={5}
        />

        <h3 className={styles.input_box_h3}>Group Expense</h3>
        <div className={styles.radio_container}>
          <input
            type="radio"
            className={styles.radio_input}
            name="paymentType"
            value="personal"
            checked={!planData.isGroupActivity}
            onChange={handleRadioChange}
          />
          <label className={styles.radio_label}>Personal Payment</label>
        </div>
        <div className={styles.radio_container}>
          <input
            type="radio"
            className={styles.radio_input}
            name="paymentType"
            value="group"
            checked={planData.isGroupActivity}
            onChange={handleRadioChange}
          />
          <label className={styles.radio_label}>Group Payment</label>
        </div>

        {/* Personal Pyment */}
        {!planData.isGroupActivity && (
          <PersonalExpense planData={planData} setPlanData={setPlanData} />
        )}

        {/* Group Payment */}
        {planData.isGroupActivity && (
          <GroupExpense
            planData={planData}
            setPlanData={setPlanData}
            isGroupPaid={isGroupPaid}
            setIsGroupPaid={setIsGroupPaid}
          />
        )}

        <h3 className={styles.input_box_h3}>Links</h3>
        <input
          className={styles.input_box}
          type="text"
          placeholder="URL"
          name="links"
          value={planData.links}
          onChange={handleInputChange}
        />
        <button
          className={`${styles.full_bg_button} ${styles.popup_button_text}`}
          onClick={editSinglePlan}
        >
          Save
        </button>
      </form>
    </div>
  );
}

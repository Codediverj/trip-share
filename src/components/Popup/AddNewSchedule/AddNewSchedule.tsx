"use client";
import React, { useState, useEffect } from "react";
import styles from "../Popup.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

//UserData(Context)
//import { useUserDataStore } from "@/contexts/userData/userData.provider";

// Popup useContext
import { usePopupContext } from "../../../contexts/popup/PopupContext";
import { getPlan } from "@/app/api/plan/plan.apis";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { SinglePlan } from "./AddNewSchedule.types";

export default function AddNewSchedule() {
  const { closePopup } = usePopupContext();
  const supabase = createClientComponentClient();
  const userData = useUserDataStore(); //user context data
  const [isNotMoving, setIsNotMoving] = useState(false);

  const [planData, setPlanData] = useState<SinglePlan>({
    order: 0,
    placeFromId: "",
    placeFromName: "",
    placeToId: "",
    placeToName: "",
    note: "",
    links: "",

    isGroupActivity: true,
    expense: 0,
    havePaid: false,
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setPlanData((prevPlanData) => ({
      ...prevPlanData,
      [name]: value,
    }));
  };

  const addNewPlan = () => {
    //closePopup();
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
  const handleRadioChange2 = (event: any) => {
    const { value } = event.target;
    //
  };

  const handleRadioChange3 = (event: any) => {
    const { value } = event.target;
    //
  };

  const handleRadioChange4 = (event: any) => {
    const { value } = event.target;
    //
  };

  return (
    <div>
      <form>
        <h2 className={styles.popupBox_title}>Add New Schedule</h2>

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

        <h3 className={styles.input_box_h3}>Expense</h3>
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
          <div className={styles.personal_payment}>
            <div className={styles.personal_total_expense}>
              <span>$</span>
              <input
                className={styles.personal_total_expense_input}
                type="text"
                placeholder="0"
                name="expense"
                value={planData.expense}
                onClick={(event) => event.currentTarget.select()}
                onChange={handleInputChange}
              />
              <span>Per Person</span>
            </div>
            <h3 className={styles.input_box_h3}>Have you already made the payment?</h3>
            <div className={styles.radio_container}>
              <input
                type="radio"
                className={styles.radio_input}
                name="personal-payment"
                value="yes"
                onChange={handleRadioChange2}
              />
              <label className={styles.radio_label}>Yes</label>
            </div>
            <div className={styles.radio_container}>
              <input
                type="radio"
                className={styles.radio_input}
                name="personal-payment"
                value="no"
                onChange={handleRadioChange2}
              />
              <label className={styles.radio_label}>No</label>
            </div>
          </div>
        )}

        {/* Group Payment */}
        {planData.isGroupActivity && (
          <div className={styles.group_payment}>
            <div className={styles.group_total_expense}>
              <span>$</span>
              <input
                className={styles.group_total_expense_input}
                type="text"
                placeholder="0"
                name="expense"
                value={planData.expense}
                onClick={(event) => event.currentTarget.select()}
                onChange={handleInputChange}
              />
              <span>total</span>
            </div>
            <h3 className={styles.input_box_h3}>Has anyone already made the payment?</h3>
            <div className={styles.radio_container}>
              <input
                type="radio"
                className={styles.radio_input}
                name="group-payment"
                value="yes"
                onChange={handleRadioChange3}
              />
              <label className={styles.radio_label}>Yes</label>
            </div>
            <div className={styles.radio_container}>
              <input
                type="radio"
                className={styles.radio_input}
                name="group-payment"
                value="no"
                onChange={handleRadioChange3}
              />
              <label className={styles.radio_label}>No</label>
            </div>
            <h3 className={styles.input_box_h3}>Who paid for it on behalf of everyone?</h3>
            <div className={styles.radio_container_bg}>
              <input
                type="radio"
                className={styles.radio_input}
                name="who-paid"
                value="user_name"
                onChange={handleRadioChange4}
              />
              <label className={styles.radio_label}>Person A</label>
            </div>
            <div className={styles.radio_container_bg}>
              <input
                type="radio"
                className={styles.radio_input}
                name="who-paid"
                value="user_name"
                onChange={handleRadioChange4}
              />
              <label className={styles.radio_label}>Person B</label>
            </div>
          </div>
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
          onClick={addNewPlan}
        >
          Save
        </button>
      </form>
    </div>
  );
}

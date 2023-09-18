"use client";
import React, { useState, FormEvent, useEffect } from "react";
import styles from "../Popup.module.scss";
import Image from "next/image";

// Popup useContext
import { usePopupContext } from "../../../contexts/popup/PopupContext";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { usePlanDataStore } from "@/contexts/planData/planData.provider";
import { DayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.types";
import { SinglePlan } from "./EditSchedule.types";

export default function EditSchedule({ data }: { data: DayPlanDataStore[number] }) {
  const { closePopup } = usePopupContext();
  const userData = useUserDataStore();
  const planContextData = usePlanDataStore();
  const [isNotMoving, setIsNotMoving] = useState(data.placeToName === undefined ? true : false);
  const [isGroupPaid, setIsGroupPaid] = useState(false);

  //console.log(data);

  interface Expense {
    expense: number;
    expenseId: number;
    attendedUser: {
      attendedUserId: string;
      attendedUserNickname?: string;
      attendedUserImage?: string;
    };
    paidUser?: {
      paidUserId: string;
      paidUserrNickname?: string;
      paidUserUserImage?: string;
    };
  }

  function calculateExpense(isGroupActivity: boolean, expenses: { expense: number }[]) {
    if (isGroupActivity) {
      return expenses.reduce((total, expenseItem) => total + expenseItem.expense, 0);
    } else {
      const totalExpense = expenses.reduce((total, expenseItem) => total + expenseItem.expense, 0);
      return expenses.length > 0 ? totalExpense / expenses.length : 0;
    }
  }

  function findOutPaidUser(
    isGroupPaid: boolean,
    singlePlanExpenses: Expense[],
    userId: string
  ): string {
    const paidUserArray = makePaidUserArray(singlePlanExpenses);
    if (isGroupPaid) {
      return paidUserArray[0];
    } else {
      const matchingExpense = paidUserArray.find((paidId) => paidId === userId);
      return matchingExpense ? matchingExpense : "";
    }
  }

  function makePaidUserArray(singlePlanExpenses: Expense[]): string[] {
    const paidUserIds: string[] = [];

    singlePlanExpenses.forEach((expense) => {
      const paidUserId = expense.paidUser?.paidUserId;
      if (paidUserId) {
        paidUserIds.push(paidUserId);
      }
    });
    return paidUserIds;
  }

  const [planData, setPlanData] = useState<Omit<SinglePlan, "singlePlanId" | "planId">>({
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
    paidID: findOutPaidUser(isGroupPaid, data.Single_Plan_Expense, userData.userId),
  });

  useEffect(() => {
    const updatedIsGroupPaid = data.isGroupActivity && planData.paidID !== "";
    setIsGroupPaid(updatedIsGroupPaid);
  }, [data, planData]);

  console.log(planData);

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
  const handlePersonalPaid = (event: any) => {
    const { value } = event.target;
    const paidID = value === "yes" ? userData.userId : "";
    setPlanData((prevData) => ({
      ...prevData,
      paidID: paidID,
    }));
  };

  const handleGroupPaid = (event: any) => {
    const { value } = event.target;
    if (isGroupPaid) {
      setPlanData((prevData) => ({
        ...prevData,
        paidID: value,
      }));
    }
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
            {planData.expense > 0 && (
              <>
                <h3 className={styles.input_box_h3}>Have you already made the payment?</h3>
                <div className={styles.radio_container}>
                  <input
                    type="radio"
                    className={styles.radio_input}
                    name="personal-payment"
                    value="yes"
                    onChange={handlePersonalPaid}
                    checked={planData.paidID === userData.userId}
                  />
                  <label className={styles.radio_label}>Yes</label>
                </div>
                <div className={styles.radio_container}>
                  <input
                    type="radio"
                    className={styles.radio_input}
                    name="personal-payment"
                    value="no"
                    onChange={handlePersonalPaid}
                    checked={planData.paidID !== userData.userId}
                  />
                  <label className={styles.radio_label}>No</label>
                </div>
              </>
            )}
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
            {planData.expense > 0 && (
              <>
                <h3 className={styles.input_box_h3}>Has anyone already made the payment?</h3>
                <div className={styles.radio_container}>
                  <input
                    type="radio"
                    className={styles.radio_input}
                    name="group-payment"
                    onChange={() => setIsGroupPaid(true)}
                    checked={isGroupPaid}
                  />
                  <label className={styles.radio_label}>Yes</label>
                </div>
                <div className={styles.radio_container}>
                  <input
                    type="radio"
                    className={styles.radio_input}
                    name="group-payment"
                    onChange={() => setIsGroupPaid(false)}
                    checked={!isGroupPaid}
                  />
                  <label className={styles.radio_label}>No</label>
                </div>
                {isGroupPaid && (
                  <>
                    <h3 className={styles.input_box_h3}>Who paid for it on behalf of everyone?</h3>
                    {planContextData.peopleJoin.map((person, index) => (
                      <div key={index} className={styles.radio_container_bg}>
                        <input
                          type="radio"
                          className={styles.radio_input}
                          name="who-paid"
                          value={person.userId}
                          onChange={handleGroupPaid}
                          checked={person.userId === planData.paidID}
                        />
                        <Image
                          src={person.profileImage || "/profile_default_image.svg"}
                          alt="profile image"
                          width="20"
                          height="20"
                        />
                        <label className={styles.radio_label}>{person.nickname}</label>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
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
          onClick={editSinglePlan}
        >
          Save
        </button>
      </form>
    </div>
  );
}

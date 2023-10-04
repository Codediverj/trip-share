"use client";
import React, { useState, FormEvent, useEffect } from "react";
import styles from "../Popup.module.scss";
import Image from "next/image";

// Popup useContext
import { usePlanDataStore } from "@/contexts/planData/planData.provider";
import { SinglePlan } from "./EditSchedule.types";

interface PersonalExpenseProps {
  planData: Omit<SinglePlan, "singlePlanId" | "planId">;
  setPlanData: React.Dispatch<React.SetStateAction<Omit<SinglePlan, "singlePlanId" | "planId">>>;
  isGroupPaid: boolean;
  setIsGroupPaid: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function GroupExpense({
  planData,
  setPlanData,
  isGroupPaid,
  setIsGroupPaid,
}: PersonalExpenseProps) {
  const planContextData = usePlanDataStore();
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setPlanData((prevPlanData) => ({
      ...prevPlanData,
      [name]: value,
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

  return (
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
  );
}

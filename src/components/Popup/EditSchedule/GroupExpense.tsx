"use client";
import React, { useState, FormEvent, useEffect } from "react";
import styles from "../Popup.module.scss";
import Image from "next/image";

// Popup useContext
import { usePlanDataStore } from "@/contexts/planData/planData.provider";
import { SinglePlan } from "./EditSchedule.types";
import RadioInput from "@/components/Form/RadioInput";
import DefaultTextExpense from "@/components/Form/DefaultTextExpense";

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
      <DefaultTextExpense
        placeholder="0"
        name="expense"
        value={planData.expense}
        onClick={(event) => event.currentTarget.select()}
        onChange={handleInputChange}
        nextText={"total"}
        isGroupActivity={planData.isGroupActivity}
      />

      {planData.expense > 0 && (
        <>
          <h3 className={styles.input_box_h3}>Has anyone already made the payment?</h3>
          <RadioInput
            name="group-payment"
            onChange={() => setIsGroupPaid(true)}
            labelText="Yes"
            checked={isGroupPaid}
          />
          <RadioInput
            name="group-payment"
            onChange={() => setIsGroupPaid(false)}
            labelText="No"
            checked={!isGroupPaid}
          />

          {isGroupPaid && (
            <>
              <h3 className={styles.input_box_h3}>Who paid for it on behalf of everyone?</h3>
              {planContextData.peopleJoin.map((person, index) => (
                <RadioInput
                  key={index}
                  name="who-paid"
                  value={person.userId}
                  onChange={handleGroupPaid}
                  checked={person.userId === planData.paidID}
                  withImage={true}
                  imageSrc={person.profileImage}
                  labelText={person.nickname}
                />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}

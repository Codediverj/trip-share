"use client";
import React, { useState, FormEvent } from "react";
import styles from "../Popup.module.scss";

// Popup useContext
import { usePopupContext } from "../../../contexts/popup/PopupContext";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { usePlanDataStore } from "@/contexts/planData/planData.provider";
import { SinglePlan } from "./AddNewSchedule.types";

//input components
import DefaultText from "@/components/Form/DefaultText";
import LongTextBox from "@/components/Form/LongTextBox";
import RadioInput from "@/components/Form/RadioInput";
import DefaultTextExpense from "@/components/Form/DefaultTextExpense";
import CheckBox from "@/components/Form/CheckBox";

export default function AddNewSchedule({
  selectedDate,
  nextOrder,
}: {
  selectedDate: Date;
  nextOrder: number;
}) {
  const { closePopup } = usePopupContext();
  const userData = useUserDataStore();
  const planContextData = usePlanDataStore();
  const [isNotMoving, setIsNotMoving] = useState(false);
  const [isGroupPaid, setIsGroupPaid] = useState(false);
  const [fromErrorMessage, setFromErrorMessage] = useState<string>("");
  const [toErrorMessage, setToErrorMessage] = useState<string>("");

  const [planData, setPlanData] = useState<Omit<SinglePlan, "singlePlanId" | "planId">>({
    date: selectedDate,
    order: nextOrder,
    placeFromId: "",
    placeFromName: "",
    placeToId: "",
    placeToName: "",
    note: "",
    links: "",
    isGroupActivity: true,
    createdAt: new Date(),
    createdBy: "",
    updatedAt: new Date(),
    updatedBy: "",
    expense: 0,
    paidID: "",
  });

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

  const addNewSinglePlan = (event: FormEvent) => {
    event.preventDefault();

    const {
      date,
      order,
      placeFromId,
      placeFromName,
      placeToId,
      placeToName,
      note,
      links,
      isGroupActivity,
      expense,
      createdBy,
      updatedBy,
      paidID,
    } = planData;

    let hasError = false;

    if (!planData) {
      return;
    }
    if (!placeFromName || !placeFromName.trim()) {
      setFromErrorMessage("This field cannot be empty.");
      hasError = true;
    }
    if (!isNotMoving && placeToName === "") {
      setToErrorMessage("This field cannot be empty.");
      hasError = true;
    }
    if (hasError) {
      return;
    }

    fetch("/api/createSinglePlan", {
      method: "POST",
      body: JSON.stringify({
        planId: planContextData.planId,
        date: date.toISOString().split("T")[0],
        order: order,
        placeFromId: placeFromId,
        placeFromName: placeFromName,
        placeToId: placeToId || undefined,
        placeToName: placeToName || undefined,
        note: note || undefined,
        links: links || undefined,
        createdAt: new Date().toISOString().split("T")[0],
        createdBy: createdBy,
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
        <h2 className={styles.popupBox_title}>Add New Schedule</h2>

        <h3 className={styles.input_box_h3}>From</h3>
        <DefaultText
          name="placeFromName"
          value={planData.placeFromName}
          onChange={handleInputChange}
          placeholder={"Location"}
          errorMessage={fromErrorMessage}
        />

        <div className={`${styles.input_checkbox_wrap} ${isNotMoving ? styles.disabled : ""}`}>
          <h3 className={styles.input_box_h3}>To</h3>
          <CheckBox checked={isNotMoving} onChange={handleCheckboxChange} text="I am not moving" />
          <DefaultText
            name="placeToName"
            value={planData.placeToName || ""}
            onChange={handleInputChange}
            placeholder={"Location"}
            disabled={isNotMoving}
            errorMessage={toErrorMessage}
          />
        </div>

        <h3 className={styles.input_box_h3}>What are you going to do here?</h3>
        <LongTextBox
          placeholder="Type your Plan"
          name="note"
          onChange={handleInputChange}
          value={planData.note}
          rows={5}
        />

        <h3 className={styles.input_box_h3}>Group Expense</h3>
        <RadioInput
          name="paymentType"
          value="personal"
          checked={!planData.isGroupActivity}
          onChange={handleRadioChange}
          labelText="Personal Payment"
        />
        <RadioInput
          name="paymentType"
          value="group"
          checked={planData.isGroupActivity}
          onChange={handleRadioChange}
          labelText="Group Payment"
        />

        {/* Personal Pyment */}
        {!planData.isGroupActivity && (
          <div className={styles.personal_payment}>
            <DefaultTextExpense
              placeholder="0"
              name="expense"
              value={planData.expense}
              onClick={(event) => event.currentTarget.select()}
              onChange={handleInputChange}
              nextText={"per person"}
              isGroupActivity={planData.isGroupActivity}
            />
            {planData.expense > 0 && (
              <>
                <h3 className={styles.input_box_h3}>Have you already made the payment?</h3>
                <RadioInput
                  name="personal-payment"
                  value="yes"
                  onChange={handlePersonalPaid}
                  labelText="Yes"
                />
                <RadioInput
                  name="personal-payment"
                  value="no"
                  onChange={handlePersonalPaid}
                  labelText="No"
                />
              </>
            )}
          </div>
        )}

        {/* Group Payment */}
        {planData.isGroupActivity && (
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
                />
                <RadioInput
                  name="group-payment"
                  onChange={() => setIsGroupPaid(false)}
                  labelText="No"
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
        )}

        <h3 className={styles.input_box_h3}>Links</h3>
        <DefaultText
          name="links"
          value={planData.links || ""}
          onChange={handleInputChange}
          placeholder={"URL"}
        />

        <button
          className={`${styles.full_bg_button} ${styles.popup_button_text}`}
          onClick={addNewSinglePlan}
        >
          Save
        </button>
      </form>
    </div>
  );
}

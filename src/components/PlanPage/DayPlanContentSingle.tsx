"use client";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./DayPlan.module.scss";

// Popup useContext
import { usePopupContext } from "../../contexts/popup/PopupContext";
import AddNewPlan from "../Popup/AddNewPlan";
import DeletePlan from "../Popup/DeletePlan";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { DayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.types";
import EditSchedule from "../Popup/EditSchedule/EditSchedule";

function DayPlanContentSingle({
  data,
  selectedDate,
}: {
  data: DayPlanDataStore[number];
  selectedDate: Date;
}) {
  const { openPopup } = usePopupContext();
  const userData = useUserDataStore();

  //console.log(data);

  const isPaid = useMemo(() => {
    if (data.isGroupActivity) {
      return data.Single_Plan_Expense.every((expense) => expense.paidUser);
    }
    return data.Single_Plan_Expense.filter(
      (expense) => expense.attendedUser.attendedUserId === userData.userId
    ).every((expense) => expense.paidUser);
  }, [data.isGroupActivity, data.Single_Plan_Expense, userData.userId]);

  const calExpense = useMemo(() => {
    const expenseTotal = data.Single_Plan_Expense.reduce(
      (total: number, item: { expense: number }) => total + item.expense,
      0
    );
    const calculatedExpense = data.isGroupActivity
      ? expenseTotal.toFixed(2)
      : (expenseTotal / data.Single_Plan_Expense.length).toFixed(2);
    return calculatedExpense;
  }, [data.Single_Plan_Expense]);

  return (
    <div className={styles.day_plan_content_single}>
      <div className="top_part">
        <h4 className="number">{data.order}</h4>
        <h3 className="location">
          <span className="location_from">{data.placeFromName}</span>

          {data.placeToName && (
            <>
              <Image
                src="/location-arrow-left.svg"
                alt="arrow icon"
                width="16"
                height="16"
                className="arrow_left"
              />
              <span className="location_to">{data.placeToName}</span>
            </>
          )}
        </h3>
        <div className="middle_block">
          <p className="plan_content">{data.note}</p>
          {data.links && (
            <Link href={data.links} className="link_button" target="_blank">
              Link
            </Link>
          )}
        </div>
      </div>
      {data.Single_Plan_Expense.length > 0 && (
        <div className="bottom_part">
          <div className="price_part">
            <span className="each">{data.isGroupActivity ? "Group" : "For me"}</span>
            <span className="price">${calExpense}</span>
          </div>

          <div className="join_list">
            {isPaid ? (
              <div className="paid">
                <Image
                  src="/check-green-14x14.svg"
                  alt="check icon"
                  width="14"
                  height="14"
                  className="paid_icon"
                />
                <span>Paid</span>
              </div>
            ) : (
              <div className="unpaid">
                <Image
                  src="/close-red-14x14.svg"
                  alt="x icon"
                  width="14"
                  height="14"
                  className="unpaid_icon"
                />
                <span>Unpaid</span>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="edit_area">
        <button className="edit_button" onClick={() => openPopup(<EditSchedule data={data} />)}>
          <Image
            src="/edit_purple.svg"
            alt="edit icon"
            width="12"
            height="12"
            className="edit_icon"
          />
          <span>Edit</span>
        </button>
        <button className="delete_button" onClick={() => openPopup(<DeletePlan data={data} />)}>
          <Image
            src="/close-red-14x14.svg"
            alt="delete icon"
            width="14"
            height="14"
            className="delete_icon"
          />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default DayPlanContentSingle;

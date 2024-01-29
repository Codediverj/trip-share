"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { DateTime } from "luxon";

//useContext
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { DayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.types";
import MoreButtonDayPlan from "./MoreButtonDayPlan";
import { usePlanDataStore } from "@/contexts/planData/planData.provider";
import { findOutPaidUser } from "@/utils/findoutPaidUser.utils";
import OrderChangeButton from "./OrderChangeButton";

function DayPlanContentSingle({
  data,
  selectedDate,
}: {
  data: DayPlanDataStore[number];
  selectedDate: Date;
}) {
  const userData = useUserDataStore();
  const planData = usePlanDataStore();

  const isPaid = useMemo(() => {
    if (data.isGroupActivity) {
      return data.Single_Plan_Expense.every((expense) => expense.paidUser);
    }
    return data.Single_Plan_Expense.filter(
      (expense) => expense.attendedUser.attendedUserId === userData.userId
    ).every((expense) => expense.paidUser);
  }, [data.isGroupActivity, data.Single_Plan_Expense, userData.userId]);

  const PaidId = useMemo(() => {
    return findOutPaidUser(data.isGroupActivity, data.Single_Plan_Expense, userData.userId);
  }, [data.Single_Plan_Expense, data.isGroupActivity, userData.userId]);

  const calExpense = useMemo(() => {
    const expenseTotal = data.Single_Plan_Expense.reduce(
      (total: number, item: { expense: number }) => total + item.expense,
      0
    );
    const calculatedExpense = data.isGroupActivity
      ? expenseTotal.toFixed(2)
      : (expenseTotal / data.Single_Plan_Expense.length).toFixed(2);
    return calculatedExpense;
  }, [data.Single_Plan_Expense, data.isGroupActivity]);

  const matchedNickname = findMatchingNickname(data.Single_Plan_Expense);
  function findMatchingNickname(data: any) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].attendedUser.attendedUserId === PaidId) {
        return data[i].attendedUser.attendedUserNickname;
      }
    }
    return null;
  }

  // 4가지 시나리오 (업데이트 체크 할지말지 정하는 로직)
  // (표시 안함) setShowUpdateIndicator(false)
  //1. data.updated_by가 내 userID일 경우 => 그냥 패스(새로운 업데이트 없음)
  //2. data.updated_by가 내 userID가 아니면서, data.updated_at이 data.lastCheckTime보다 과거면 => 이미 열어본것

  // (업데이트 표시 보여주기) setShowUpdateIndicator(true)
  //3. data.updated_by가 내 userID가 아니면서, data.updated_at이 data.lastCheckTime보다 미래면
  //4. data.updated_by가 내 userID가 아니면서, UpdateCheck 테이블에 데이터 없는 경우

  const UpdateCheck = useMemo(() => {
    const { updatedBy, updatedAt, lastCheckTime } = data;

    if (updatedBy !== userData.userId) {
      const updatedAtDateTime = DateTime.fromJSDate(updatedAt);
      const lastCheckTimeDateTime = lastCheckTime ? DateTime.fromJSDate(lastCheckTime) : undefined;

      //1
      if (updatedBy === userData.userId) {
        return false;
      }
      //2
      else if (lastCheckTimeDateTime !== undefined && updatedAtDateTime <= lastCheckTimeDateTime) {
        return false;
      }
      //3
      else if (lastCheckTimeDateTime !== undefined && updatedAtDateTime > lastCheckTimeDateTime) {
        return true;
      }
      //4
      else if (lastCheckTimeDateTime === undefined) {
        return true;
      }
    } else {
      return false;
    }
  }, [data, userData.userId]);

  return (
    <div className={`day_plan_content_single ${UpdateCheck ? "update_bg" : ""}`}>
      <OrderChangeButton data={data} />
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
              External Link
            </Link>
          )}
        </div>
      </div>
      {data.Single_Plan_Expense.length > 0 && (
        <div className="bottom_part">
          <div className="price_part">
            <span className="each">{data.isGroupActivity ? "Group" : "For me"}</span>
            <span className="price">{`${calExpense} ${planData.currency}`}</span>
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
                <span>{data.isGroupActivity ? `${matchedNickname} Paid for All` : `I Paid`}</span>
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
                <span>Not Paid yet</span>
              </div>
            )}
          </div>
        </div>
      )}
      <MoreButtonDayPlan data={data} />
    </div>
  );
}

export default DayPlanContentSingle;

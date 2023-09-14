"use client";
import React, { useContext, useState, useEffect } from "react";
import styles from "./DayPlan.module.scss";

import DayPlanContentSingle from "./DayPlanContentSingle";
import AddNewScheduleButton from "../AddNewScheduleButton";
import { useDayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.provider";

function DayPlanContent({ selectedDate }: { selectedDate: Date }) {
  const dayPlanData = useDayPlanDataStore();
  const formattedDate = selectedDate.toDateString();

  return (
    <div className={styles.day_plan_content}>
      <h2 className="plan_date">{formattedDate}</h2>

      {dayPlanData.map((data) => (
        <DayPlanContentSingle key={data.singlePlanId} data={data} />
      ))}

      <AddNewScheduleButton />
    </div>
  );
}

export default DayPlanContent;

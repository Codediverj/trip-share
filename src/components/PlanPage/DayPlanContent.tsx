"use client";
import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./DayPlan.module.scss";

import DayPlanContentSingle from "./DayPlanContentSingle";
import AddNewScheduleButton from "../AddNewScheduleButton";

function DayPlanContent() {
  useEffect(() => {}, []);

  return (
    <div className={styles.day_plan_content}>
      {/* 날짜가 자동으로 늘어나야함.*/}
      <h2 className="plan_date">November 12, Friday</h2>
      {/* 데이터 갯수에 맞게 아래 컴포넌트가 반복되어야 함.*/}
      <DayPlanContentSingle />
      <AddNewScheduleButton />
    </div>
  );
}

export default DayPlanContent;

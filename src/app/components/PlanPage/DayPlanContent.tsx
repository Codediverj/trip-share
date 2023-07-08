"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./DayPlan.module.scss";

import AddNewButton from "../AddNewButton";
import DayPlanContentSingle from "./DayPlanContentSingle";

function DayPlanContent() {
  return (
    <div>
      {/* 날짜가 자동으로 늘어나야함.*/}
      <h2 className={styles.plan_header}>November 12, Friday</h2>
      {/* 데이터 갯수에 맞게 아래 컴포넌트가 반복되어야 함.*/}
      <DayPlanContentSingle />
      <AddNewButton />
    </div>
  );
}

export default DayPlanContent;

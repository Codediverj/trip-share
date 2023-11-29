"use client";
import styles from "./DayPlan.module.scss";
import DayPlanContentSingle from "./DayPlanContentSingle";
import AddNewScheduleButton from "../AddNewScheduleButton";
import { useDayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/supabase.types";
import { useUserDataStore } from "@/contexts/userData/userData.provider";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useCallback, useEffect, useState } from "react";
import { DateTime } from "luxon";

function DayPlanContent({ selectedDate }: { selectedDate: Date }) {
  const dayPlanData = useDayPlanDataStore();
  const formattedDate = selectedDate.toDateString();
  const supabase = createClientComponentClient<Database>();
  const userData = useUserDataStore();

  const maxOrder = dayPlanData.reduce((max, data) => {
    return data.order > max ? data.order : max;
  }, -1);
  const nextOrder = maxOrder + 1;

  // 1. filterling
  // 해당 plan_id 에 속한
  // Single_Plan(Table): date === selectedDate 해당탭 일정들만 고르고

  // 2. useEffect를 여기에 추가:  checkTime을 현재 시간으로 바꿔주기
  // SinglePlanId(위에 필터링 받아몸) + UserId(내아이디) + checkTime(현재시각)

  useEffect(() => {
    if (!dayPlanData || !userData) {
      return;
    }

    // const selectedDT = DateTime.fromJSDate(selectedDate);

    // const filteredData = dayPlanData.filter((data) =>
    //   DateTime.fromJSDate(data.date).hasSame(selectedDT, "day")
    // );

    dayPlanData.forEach((data) => {
      const singlePlanId = data.singlePlanId;
      const checkTime = new Date();

      // supabase
      //   .from("UpdateCheck")
      //   .upsert({
      //     single_plan_id: singlePlanId,
      //     user_id: userData.userId,
      //     check_time: checkTime.toISOString(),
      //   })
      //   .then(({ data, error }) => {
      //     if (error) {
      //       console.log(error);
      //     }
      //     if (data) {
      //       console.log(data);
      //     }
      //   });
    });
  }, [selectedDate, supabase, dayPlanData, userData.userId, userData]);

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    //여기에 코드 넣기
  }, []);

  return (
    <div className={styles.day_plan_content}>
      <h2 className="plan_date">{formattedDate}</h2>
      <DndProvider backend={HTML5Backend}>
        {dayPlanData.map((data) => (
          <DayPlanContentSingle key={data.singlePlanId} data={data} selectedDate={selectedDate} />
        ))}
      </DndProvider>
      <AddNewScheduleButton selectedDate={selectedDate} nextOrder={nextOrder} />
    </div>
  );
}

export default DayPlanContent;

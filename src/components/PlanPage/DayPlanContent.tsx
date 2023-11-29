"use client";
import styles from "./DayPlan.module.scss";
import DayPlanContentSingle from "./DayPlanContentSingle";
import AddNewScheduleButton from "../AddNewScheduleButton";
import { useDayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/supabase.types";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { useEffect } from "react";
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

  useEffect(() => {
    if (!dayPlanData || !userData) {
      return;
    }
    //타임비교하는법
    // const selectedDT = DateTime.fromJSDate(selectedDate);
    // const filteredData = dayPlanData.filter((data) =>
    //   DateTime.fromJSDate(data.date).hasSame(selectedDT, "day")
    // );

    const makeUpdateCheck = dayPlanData.map((data) => ({
      single_plan_id: data.singlePlanId,
      check_time: new Date().toISOString(),
      user_id: userData.userId,
    }));

    supabase
      .from("UpdateCheck")
      .upsert(makeUpdateCheck)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }
        if (data) {
          console.log(data);
        }
      });
  }, [selectedDate, supabase, dayPlanData, userData.userId, userData]);

  return (
    <div className={styles.day_plan_content}>
      <h2 className="plan_date">{formattedDate}</h2>
      {dayPlanData.map((data) => (
        <DayPlanContentSingle key={data.singlePlanId} data={data} selectedDate={selectedDate} />
      ))}
      <AddNewScheduleButton selectedDate={selectedDate} nextOrder={nextOrder} />
    </div>
  );
}

export default DayPlanContent;

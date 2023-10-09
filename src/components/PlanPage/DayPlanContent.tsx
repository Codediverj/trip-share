"use client";
import styles from "./DayPlan.module.scss";
import DayPlanContentSingle from "./DayPlanContentSingle";
import AddNewScheduleButton from "../AddNewScheduleButton";
import { useDayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.provider";

function DayPlanContent({ selectedDate }: { selectedDate: Date }) {
  const dayPlanData = useDayPlanDataStore();
  const formattedDate = selectedDate.toDateString();

  const maxOrder = dayPlanData.reduce((max, data) => {
    return data.order > max ? data.order : max;
  }, -1);
  const nextOrder = maxOrder + 1;

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

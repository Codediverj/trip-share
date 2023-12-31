"use client";
import React, { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./DayPlan.module.scss";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { cx } from "../../utils/classname.utils";
import DayPlanContent from "./DayPlanContent";
import { useDayPlanData } from "@/contexts/dayPlanData/dayPlanData.provider";
import { usePlanDataStore } from "@/contexts/planData/planData.provider";
import { DateTime } from "luxon";

function DayPlan({ totaldays }: { totaldays: number }) {
  const { startDate } = usePlanDataStore();
  const [activeSubTab, setActiveSubTab] = useState(0);
  const selectedDate = DateTime.fromJSDate(startDate)
    .startOf("day")
    .plus({ day: activeSubTab })
    .toJSDate();

  const changeDate = useDayPlanData();

  const handleSubTabClick = (index: number) => {
    setActiveSubTab(index);
    changeDate(index);
  };

  const swiperSlides = Array.from({ length: totaldays }, (_, index) => index + 1);
  return (
    <div>
      <div className={styles.sub_tab_menu}>
        <Swiper className={styles.sub_tab_swipe} spaceBetween={0} slidesPerView={3.5}>
          {swiperSlides.map((day) => (
            <SwiperSlide
              key={day}
              className={cx("sub_tab_item", activeSubTab === day - 1 ? "active" : "")}
              onClick={() => handleSubTabClick(day - 1)}
            >
              Day {day}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="sub-tab-content page_container_middle page_gray_bg">
        {activeSubTab >= 0 && activeSubTab < totaldays && (
          <DayPlanContent selectedDate={selectedDate} />
        )}
      </div>
    </div>
  );
}

export default DayPlan;

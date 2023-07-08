"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./DayPlan.module.scss";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { cx } from "../../utils/classname.utils";
import DayPlanContent from "./DayPlanContent";

function DayPlan() {
  const [activeSubTab, setActiveSubTab] = useState(0);
  const handleSubTabClick = (index: number) => {
    setActiveSubTab(index);
  };

  return (
    <div>
      <div className={styles.sub_tab_menu}>
        <Swiper
          className={styles.sub_tab_swipe}
          spaceBetween={0}
          slidesPerView={3.5}
        >
          <SwiperSlide
            className={cx("sub_tab_item", activeSubTab === 0 ? "active" : "")}
            onClick={() => handleSubTabClick(0)}
          >
            Day 1
          </SwiperSlide>
          <SwiperSlide
            className={cx("sub_tab_item", activeSubTab === 1 ? "active" : "")}
            onClick={() => handleSubTabClick(1)}
          >
            Day 2
          </SwiperSlide>
          <SwiperSlide
            className={cx("sub_tab_item", activeSubTab === 2 ? "active" : "")}
            onClick={() => handleSubTabClick(2)}
          >
            Day 3
          </SwiperSlide>
          <SwiperSlide
            className={cx("sub_tab_item", activeSubTab === 3 ? "active" : "")}
            onClick={() => handleSubTabClick(3)}
          >
            Day 4
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="sub-tab-content page_container_middle page_gray_bg">
        {activeSubTab === 0 && <DayPlanContent />}
        {activeSubTab === 1 && <DayPlanContent />}
        {activeSubTab === 2 && <DayPlanContent />}
        {activeSubTab === 3 && <DayPlanContent />}
      </div>
    </div>
  );
}

export default DayPlan;

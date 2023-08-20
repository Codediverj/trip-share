"use client";
import Image from "next/image";
import styles from "./Swiper.module.scss";
import Link from "next/link";

//types
import { Plan } from "../../app/api/plan/plan.types";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

//util
import { formatDateStartEnd } from "../../utils/formatDateStartEnd.utils";

interface SwiperCompProps {
  pastPlans: Plan[];
}

export default function SwiperComp({ pastPlans }: SwiperCompProps) {
  return (
    <Swiper className={styles.completed_swipe} spaceBetween={20} slidesPerView={3.5}>
      {pastPlans.map((plan) => (
        <SwiperSlide className={styles.completed_swipe_item} key={plan.planId}>
          <Link href={`/plan/${plan.planId}`}>
            <Image
              src={
                plan.backgroundImage ||
                "https://images.unsplash.com/photo-1543158266-0066955047b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              }
              alt="plus icon"
              width="125"
              height="135"
            />
            <h5>{plan.title}</h5>
            <p>{formatDateStartEnd(plan.startDate, plan.endDate)}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

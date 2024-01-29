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
import { ImageWithFetch } from "../ImageWithFetch";

interface SwiperCompProps {
  pastPlans: Plan[];
}

export default function SwiperComp({ pastPlans }: SwiperCompProps) {
  return (
    <Swiper className={styles.completed_swipe} spaceBetween={20} slidesPerView={"auto"}>
      {pastPlans.map((plan) => (
        <SwiperSlide className={styles.completed_swipe_item} key={plan.planId}>
          <Link href={`/plan/${plan.planId}`}>
            <ImageWithFetch
              uploadId={plan.backgroundImage || ""}
              alt="Plan background Image"
              width={125}
              height={135}
              imgType="planbg"
            />
            <h5>{plan.title}</h5>
            <p>{formatDateStartEnd(plan.startDate, plan.endDate)}</p>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

"use client";
import styles from "./Swiper.module.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ImageList from "../ImageList";

export default function SwiperComp({ randomImage, randomCountry }: any) {
  return (
    <Swiper
      className={styles.completed_swipe}
      spaceBetween={20}
      slidesPerView={3.5}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      <SwiperSlide className={styles.completed_swipe_item}>
        <ImageList randomImage={randomImage} randomCountry={randomCountry} />
      </SwiperSlide>
      <SwiperSlide className={styles.completed_swipe_item}>
        <ImageList randomImage={randomImage} randomCountry={randomCountry} />
      </SwiperSlide>
      <SwiperSlide className={styles.completed_swipe_item}>
        <ImageList randomImage={randomImage} randomCountry={randomCountry} />
      </SwiperSlide>
      <SwiperSlide className={styles.completed_swipe_item}>
        <ImageList randomImage={randomImage} randomCountry={randomCountry} />
      </SwiperSlide>
    </Swiper>
  );
}

"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { faker } from "@faker-js/faker";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// components
import AddNewButton from "./components/AddNewButton";
import MainImg from "./components/MainImg";
import ImageList from "./components/ImageList";

export default function Home() {
  const randomCountry = faker.location.country();
  const randomImage = faker.image.url();

  return (
    <main>
      <div className="container">
        <div className={styles.continue_plan}>
          <h3 className={styles.dashboard_title}>Continue Planning</h3>
          <MainImg randomImage={randomImage} randomCountry={randomCountry} />
          <AddNewButton />
        </div>
      </div>
      <div className={styles.completed}>
        <h3 className={styles.dashboard_title}>Completed</h3>
        <Swiper
          className={styles.completed_swipe}
          spaceBetween={20}
          slidesPerView={3.5}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide className={styles.completed_swipe_item}>
            <ImageList
              randomImage={randomImage}
              randomCountry={randomCountry}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.completed_swipe_item}>
            <ImageList
              randomImage={randomImage}
              randomCountry={randomCountry}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.completed_swipe_item}>
            <ImageList
              randomImage={randomImage}
              randomCountry={randomCountry}
            />
          </SwiperSlide>
          <SwiperSlide className={styles.completed_swipe_item}>
            <ImageList
              randomImage={randomImage}
              randomCountry={randomCountry}
            />
          </SwiperSlide>
        </Swiper>
        <div className={styles.completed_swipe}>
          <div className={styles.completed_swipe_item}></div>
        </div>
      </div>
      <div className="container">
        <div className={styles.plan_with}>
          <h3 className={styles.dashboard_title}>I plan trip with...</h3>
          <ul>
            <li>
              <Image src={randomImage} alt="plus icon" width="50" height="50" />
            </li>
            <li>
              <Image src={randomImage} alt="plus icon" width="50" height="50" />
            </li>
            <li>
              <Image src={randomImage} alt="plus icon" width="50" height="50" />
            </li>
            <li>
              <Image src={randomImage} alt="plus icon" width="50" height="50" />
            </li>
            <li>
              <Image src={randomImage} alt="plus icon" width="50" height="50" />
            </li>
            <li>
              <Image src={randomImage} alt="plus icon" width="50" height="50" />
            </li>
            <li>
              <Image src={randomImage} alt="plus icon" width="50" height="50" />
            </li>
          </ul>
        </div>
      </div>
      <footer>Footer</footer>
    </main>
  );
}

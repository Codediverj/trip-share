"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import { faker } from "@faker-js/faker";

// Popup
import Popup from "../components/Popup/Popup";
import { usePopupContext } from "../contexts/PopupContext";

// components
import AddNewButton from "../components/AddNewButton";
import SwiperComp from "../components/Swiper/Swiper";
import MainImage from "../components/HomePage/MainImage";
import PlanWithList from "../components/HomePage/PlanWithList";

export default function Home() {
  // const randomCountry = faker.location.country();
  //const randomImage = faker.image.url();
  const randomCountry = "New York";
  const randomImage =
    "https://images.unsplash.com/photo-1543158266-0066955047b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

  const { isPopupOpen, popupContent, openPopup, closePopup } =
    usePopupContext();

  return (
    <>
      <main>
        <div className="page_container">
          <div className={styles.continue_plan}>
            <h3 className={styles.dashboard_title}>Continue Planning</h3>
            <MainImage
              randomImage={randomImage}
              randomCountry={randomCountry}
            />
            <AddNewButton />
          </div>
        </div>
        <div className={styles.completed}>
          <h3 className={styles.dashboard_title}>Completed</h3>
          <SwiperComp randomImage={randomImage} randomCountry={randomCountry} />
          <div className={styles.completed_swipe}>
            <div className={styles.completed_swipe_item}></div>
          </div>
        </div>
        <div className="container">
          <PlanWithList randomImage={randomImage} />
        </div>
      </main>
      {isPopupOpen && <Popup onClose={closePopup}>{popupContent}</Popup>}
      <footer>Footer</footer>
    </>
  );
}

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

export default function Home() {
  const randomCountry = faker.location.country();
  const randomImage = faker.image.url();
  const { isPopupOpen, popupContent, openPopup, closePopup } =
    usePopupContext();

  return (
    <>
      <main>
        <div className="page_container">
          <div className={styles.continue_plan}>
            <h3 className={styles.dashboard_title}>Continue Planning</h3>
            <div className={styles.continue_plan_item}>
              <Link href={`/plan`}>
                <div className={styles.continue_plan_item_img}>
                  <div>
                    <Image
                      src={randomImage}
                      alt="plus icon"
                      width="900"
                      height="700"
                    />
                  </div>
                </div>
                <div className={styles.continue_plan_txt_box}>
                  <h4>2023 {randomCountry}</h4>
                  <p>Nov.12 ~ Dec.2 2023</p>
                </div>
              </Link>
            </div>
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
          <div className={styles.plan_with}>
            <h3 className={styles.dashboard_title}>I plan trip with...</h3>
            <ul>
              <li>
                <Image
                  src={randomImage}
                  alt="plus icon"
                  width="50"
                  height="50"
                />
              </li>
              <li>
                <Image
                  src={randomImage}
                  alt="plus icon"
                  width="50"
                  height="50"
                />
              </li>
              <li>
                <Image
                  src={randomImage}
                  alt="plus icon"
                  width="50"
                  height="50"
                />
              </li>
              <li>
                <Image
                  src={randomImage}
                  alt="plus icon"
                  width="50"
                  height="50"
                />
              </li>
              <li>
                <Image
                  src={randomImage}
                  alt="plus icon"
                  width="50"
                  height="50"
                />
              </li>
              <li>
                <Image
                  src={randomImage}
                  alt="plus icon"
                  width="50"
                  height="50"
                />
              </li>
              <li>
                <Image
                  src={randomImage}
                  alt="plus icon"
                  width="50"
                  height="50"
                />
              </li>
            </ul>
          </div>
        </div>
      </main>
      {isPopupOpen && <Popup onClose={closePopup}>{popupContent}</Popup>}
      <footer>Footer</footer>
    </>
  );
}

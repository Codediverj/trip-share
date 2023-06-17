import Image from "next/image";
import styles from "./page.module.scss";
import { faker } from "@faker-js/faker";

// components
import AddNewButton from "./components/AddNewButton";
import MainImg from "./components/MainImg";
import SwiperComp from "./components/Swiper";

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

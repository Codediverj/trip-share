import { Poppins } from "next/font/google";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <header>
        <h2>My Trips</h2>
      </header>
      <div className="container">
        <div className={styles.continue_plan}>
          <h3 className={styles.dashboard_title}>Continue Planning</h3>
          <div className={styles.continue_plan_item}>
            <div></div>
            <h4>2023 New York</h4>
            <p>Nov.12 ~ Dec.2 2023</p>
          </div>
          <div className="add_new_button">
            <Image
              src="/plus-square.svg"
              alt="plus icon"
              width="24"
              height="24"
            />
            Add New Plan
          </div>
        </div>
        <div className={styles.completed}>
          <h3 className={styles.dashboard_title}>Completed</h3>
          <div className={styles.completed_swipe}>
            <div className={styles.completed_swipe_item}>
              <Image
                src="/plus-square.svg"
                alt="plus icon"
                width="125"
                height="135"
              />
              <h5>Japan</h5>
              <p>2018.04.07 ~ 04.10</p>
            </div>
          </div>
        </div>
        <div className={styles.plan_with}>
          <h3 className={styles.dashboard_title}>I plan trip with...</h3>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </>
  );
}

import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomePage.module.scss";

function PlanWithList({ randomImage }: any) {
  return (
    <>
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
    </>
  );
}

export default PlanWithList;

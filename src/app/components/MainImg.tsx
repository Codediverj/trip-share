import React from "react";
import Image from "next/image";
import styles from "../page.module.scss";

interface MainImgProps {
  randomImage: string;
  randomCountry: string;
}

function MainImg({ randomImage, randomCountry }: MainImgProps) {
  return (
    <div className={styles.continue_plan_item}>
      <div className={styles.continue_plan_item_img}>
        <div>
          <Image src={randomImage} alt="plus icon" width="900" height="700" />
        </div>
      </div>
      <div className={styles.continue_plan_txt_box}>
        <h4>2023 {randomCountry}</h4>
        <p>Nov.12 ~ Dec.2 2023</p>
      </div>
    </div>
  );
}

export default MainImg;

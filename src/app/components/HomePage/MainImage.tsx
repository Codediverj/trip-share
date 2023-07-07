import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomePage.module.scss";

interface MainImgProps {
  randomImage: string;
  randomName: string;
}

function MainImage({ randomImage, randomCountry }: any) {
  return (
    <>
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
    </>
  );
}

export default MainImage;

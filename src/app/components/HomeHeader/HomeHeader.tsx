import React from "react";
import Image from "next/image";
import styles from "./HomeHeader.module.scss";

interface MainImgProps {
  randomImage: string;
  randomName: string;
}

function HomeHeader({ randomImage, randomName }: MainImgProps) {
  return (
    <>
      <h2 className={styles.header_h2}>{`${randomName}'s Trips`}</h2>
      <div className={styles.info_box}>
        <div>
          <div>
            <strong>12</strong>
            <span>Country</span>
          </div>
          <div>
            <strong>37</strong>
            <span>Cities</span>
          </div>
          <div>
            <strong>1</strong>
            <span>Plan</span>
          </div>
        </div>
      </div>
      <div className={styles.profile_button}>
        <Image src={randomImage} alt="plus icon" width="50" height="50" />
      </div>
    </>
  );
}

export default HomeHeader;

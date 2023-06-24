import React from "react";
import Image from "next/image";
import Link from "next/link";
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
        <Link href={`/profile`}>
          <Image src={randomImage} alt="plus icon" width="50" height="50" />
        </Link>
      </div>
    </>
  );
}

export default HomeHeader;

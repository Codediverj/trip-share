import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomePage.module.scss";
import { ImageWithFetch } from "../ImageWithFetch";

function MainImage({ backgroundImage, planTitle, date, id }: any) {
  return (
    <>
      <div className={styles.continue_plan_item}>
        <Link href={`/plan/${id}`}>
          <div className={styles.continue_plan_item_img}>
            <div>
              <ImageWithFetch
                uploadId={backgroundImage || ""}
                alt="Plan background Image"
                width={900}
                height={700}
                imgType="planbg"
              />
            </div>
          </div>
          <div className={styles.continue_plan_txt_box}>
            <h4>{planTitle}</h4>
            <p>{date}</p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default MainImage;

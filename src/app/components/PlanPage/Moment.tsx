import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Moment.module.scss";

function Moment() {
  return (
    <div className="page_container_middle page_gray_bg">
      <div className={styles.moment}>
        <div className="box_image"></div>
        <h5 className="box_title">This is title</h5>
        <p className="box_date">Aug 18</p>
        <p className="box_content">
          Lorem Ipsum is simply dummy text of the printing and typesetting.
        </p>
      </div>
    </div>
  );
}

export default Moment;

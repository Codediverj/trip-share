import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Moment.module.scss";
import AddNewMomentButton from "../AddNewMomentButton";

// Popup
import { usePopupContext } from "@/contexts/popup/PopupContext";
import AddNewMoment from "../Popup/AddNewMoment/AddNewMoment";
import MoreButton from "./MoreButton";
import { useMomentDataStore } from "@/contexts/momentData/momentData.provider";
import { useUserDataStore } from "@/contexts/userData/userData.provider";

function Moment() {
  const { openPopup } = usePopupContext();
  const momentData = useMomentDataStore();
  const userData = useUserDataStore();
  console.log(momentData);

  return (
    <div className="page_container_middle page_gray_bg">
      <div className={styles.moment}>
        <div className="moment_top">
          <h2 className="moment_h2">Our Moment...</h2>
          <button className="top_add" onClick={() => openPopup(<AddNewMoment />)}>
            <Image src="/plus-purple.svg" alt="plus icon" width="16" height="16" />
            Add New
          </button>
        </div>

        {momentData.map((data) => (
          <div className="moment_item" key={data.id}>
            {data.momentImage && (
              <div className="box_image">
                <Image src={data.momentImage} alt="image" width="614" height="534" />
              </div>
            )}
            <div className="moment_text_box">
              <h5 className="box_title">{data.title}</h5>
              <p className="box_date">{data.momentDate.toDateString()}</p>
              <p className="box_content">{data.memo}</p>
            </div>
            {data.writer.writerUserId === userData.userId && <MoreButton />}
          </div>
        ))}

        <AddNewMomentButton />
      </div>
    </div>
  );
}

export default Moment;

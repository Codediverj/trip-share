import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Moment.module.scss";
import AddNewMomentButton from "../AddNewMomentButton";

// Popup
import { usePopupContext } from "@/contexts/popup/PopupContext";
import AddNewMoment from "../Popup/AddNewMoment/AddNewMoment";
import { useMomentDataStore } from "@/contexts/momentData/momentData.provider";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import MoreButtonMoment from "./MoreButtonMoment";

function Moment() {
  const { openPopup } = usePopupContext();
  const momentData = useMomentDataStore();
  const userData = useUserDataStore();

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
              <div className="writer_area">
                <div className="profile_circle">
                  {data.writer?.writerImage && (
                    <Image src={data.writer.writerImage} alt="image" width="30" height="30" />
                  )}
                </div>
                <h4 className="writer_name">{data.writer?.writerNickName || "anonymous"}</h4>
              </div>

              <div className="info_area">
                <h5 className="box_title">{data.title}</h5>
                <p className="box_date">{data.momentDate.toDateString()}</p>
              </div>

              <p className="box_content">{data.memo}</p>
            </div>
            {data.writer?.writerUserId === userData.userId && <MoreButtonMoment data={data} />}
          </div>
        ))}

        <AddNewMomentButton />
      </div>
    </div>
  );
}

export default Moment;

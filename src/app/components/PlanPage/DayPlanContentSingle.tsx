"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./DayPlan.module.scss";
import { cx } from "../../utils/classname.utils";

// Popup useContext
import { usePopupContext } from "../../../contexts/popup/PopupContext";
import AddNewPlan from "../Popup/AddNewPlan";
import DeletePlan from "../Popup/DeletePlan";

function DayPlanContentSingle() {
  const { openPopup } = usePopupContext();
  return (
    <div className={styles.day_plan_content_single}>
      <div className="top_part">
        <h4 className="number">1</h4>
        <h3 className="location">
          <span className="location_from">Vancouver city Vancouver city</span>
          <Image
            src="/location-arrow-left.svg"
            alt="arrow icon"
            width="16"
            height="16"
            className="arrow_left"
          />
          <span className="location_to">Olympic village station Olympic village station</span>
        </h3>
        <div className="middle_block">
          <p className="plan_content">
            Lorem Ipsum is simply dummy text of the printing and typesetting. Lorem Ipsum is simply
            dummy text of the printing and typesetting.
          </p>
          <Link href={""} className="link_button">
            Link
          </Link>
        </div>
      </div>
      <div className="bottom_part">
        <div className="price_part">
          <span className="each">Each</span>
          <span className="price">$350</span>
        </div>
        <div className="join_list">
          <ul className="join_list_ul">
            <li className="join_list_li">{/* 이미지로 교체 */}</li>
            <li className="join_list_li">{/* 이미지로 교체 */}</li>
          </ul>
          <div className="paid">
            <Image
              src="/check-green-14x14.svg"
              alt="check icon"
              width="14"
              height="14"
              className="paid_icon"
            />
            <span>Paid</span>
          </div>
          <div className="unpaid">
            <Image
              src="/close-red-14x14.svg"
              alt="x icon"
              width="14"
              height="14"
              className="unpaid_icon"
            />
            <span>Unpaid</span>
          </div>
        </div>
      </div>
      <div className="edit_area">
        <button className="edit_button" onClick={() => openPopup(<AddNewPlan />)}>
          <Image
            src="/edit_purple.svg"
            alt="edit icon"
            width="12"
            height="12"
            className="edit_icon"
          />
          <span>Edit</span>
        </button>
        <button className="delete_button" onClick={() => openPopup(<DeletePlan />)}>
          <Image
            src="/close-red-14x14.svg"
            alt="delete icon"
            width="14"
            height="14"
            className="delete_icon"
          />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default DayPlanContentSingle;

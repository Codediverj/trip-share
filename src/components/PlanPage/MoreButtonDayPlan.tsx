import React, { FormEvent, useState } from "react";
import Image from "next/image";
import styles from "./DayPlan.module.scss";
import { usePopupContext } from "@/contexts/popup/PopupContext";
import { DayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.types";
import EditSchedule from "../Popup/EditSchedule/EditSchedule";
import DeletePlan from "../Popup/DeletePlan";

function MoreButtonDayPlan({ data }: { data: DayPlanDataStore[number] }) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { openPopup } = usePopupContext();

  return (
    <div className="more_button_wrap">
      <button className="more_button" onClick={() => setIsMoreOpen(!isMoreOpen)}>
        <Image src="/more-horizontal.svg" alt="plus icon" width="24" height="24" />
      </button>
      {isMoreOpen && (
        <div className="edit_area">
          <button className="edit_button" onClick={() => openPopup(<EditSchedule data={data} />)}>
            <Image
              src="/edit_purple.svg"
              alt="edit icon"
              width="12"
              height="12"
              className="edit_icon"
            />
            <span>Edit</span>
          </button>
          <button className="delete_button" onClick={() => openPopup(<DeletePlan data={data} />)}>
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
      )}
    </div>
  );
}

export default MoreButtonDayPlan;

"use client";
import React from "react";
import Image from "next/image";

// Popup useContext
import { usePopupContext } from "../../contexts/popup/PopupContext";

// Popup Content
import AddNewSchedule from "./Popup/AddNewSchedule";

function AddNewScheduleButton() {
  const { openPopup } = usePopupContext();
  return (
    <div className="add_new_button" onClick={() => openPopup(<AddNewSchedule />)}>
      <Image src="/plus-square.svg" alt="plus icon" width="24" height="24" />
      Add New Schedule
    </div>
  );
}

export default AddNewScheduleButton;

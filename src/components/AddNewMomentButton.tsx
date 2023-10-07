"use client";
import React from "react";
import Image from "next/image";

// Popup useContext
import { usePopupContext } from "../contexts/popup/PopupContext";

// Popup Content
import AddNewMoment from "./Popup/AddNewMoment/AddNewMoment";

function AddNewMomentButton() {
  const { openPopup } = usePopupContext();
  return (
    <div className="add_new_button" onClick={() => openPopup(<AddNewMoment />)}>
      <Image src="/plus-square.svg" alt="plus icon" width="24" height="24" />
      Add New Moment
    </div>
  );
}

export default AddNewMomentButton;

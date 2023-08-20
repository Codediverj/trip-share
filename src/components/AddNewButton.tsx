"use client";
import React from "react";
import Image from "next/image";

// Popup useContext
import { usePopupContext } from "../contexts/popup/PopupContext";

// Popup Content
import AddNewPlan from "./Popup/AddNewPlan";

function AddNewButton() {
  const { openPopup } = usePopupContext();
  return (
    <div className="add_new_button" onClick={() => openPopup(<AddNewPlan />)}>
      <Image src="/plus-square.svg" alt="plus icon" width="24" height="24" />
      Add New Plan
    </div>
  );
}

export default AddNewButton;

import React, { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Moment.module.scss";
import { usePopupContext } from "@/contexts/popup/PopupContext";
import EditMoment from "../Popup/EditMoment/EditMoment";
import { MomentDataType } from "./singleMoment.types";

function MoreButtonMoment({ data }: { data: MomentDataType }) {
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const { openPopup } = usePopupContext();

  const handleEditButtonClick = () => {
    openPopup(<EditMoment data={data} />);
    setIsMoreOpen(false);
  };

  const handleDeleteButtonClick = (event: FormEvent) => {
    setIsMoreOpen(false);
    event.preventDefault();
    if (!data) {
      return;
    }
    fetch("/api/deleteMoment", {
      method: "POST",
      body: JSON.stringify({
        id: data.id,
      }),
    });
  };

  return (
    <>
      <button className="more_button" onClick={() => setIsMoreOpen(!isMoreOpen)}>
        <Image src="/more-horizontal.svg" alt="plus icon" width="24" height="24" />
      </button>
      {isMoreOpen && (
        <div className="button_group">
          <button className="edit_moment" onClick={handleEditButtonClick}>
            <Image src="/edit_purple.svg" alt="plus icon" width="12" height="12" />
            Edit
          </button>
          <button className="delete_moment" onClick={handleDeleteButtonClick}>
            <Image src="/close-red-14x14.svg" alt="plus icon" width="14" height="14" />
            Delete
          </button>
        </div>
      )}
    </>
  );
}

export default MoreButtonMoment;

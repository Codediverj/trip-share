import { useState, useEffect } from "react";
import styles from "./Popup.module.scss";
import Image from "next/image";
import { getFriends } from "@/app/api/plan/plan.apis";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function EditFriendsList({ planId }: { planId: string }) {
  const supabase = createClientComponentClient();
  useEffect(() => {
    getFriends(supabase, planId)
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }, [supabase, planId]);
  return (
    <div>
      <h2 className={styles.popupBox_title}>Edit Traveler List</h2>
      <div className={styles.edit_friends_list}>
        <div className={styles.edit_friends_list_item}>
          <div className={styles.edit_friends_list_item_inner}>
            <Image
              src="/profile_default_image.svg"
              alt="profile image"
              width="30"
              height="30"
              className={styles.edit_friends_list_item_image}
            />
            <span className={styles.edit_friends_list_name}>Eunji Oh</span>

            <div className={styles.edit_friends_owner}>Owner</div>
          </div>
        </div>
      </div>

      <h2 className={styles.popupBox_title}>Add Traveler</h2>
      <div className={styles.add_traveler}>
        <span>To add someone to your friend list,</span>
        <span>enter their Traveler Code.</span>
        <input className={styles.input_box_code} type="text" placeholder="0000 0000 0000" />
      </div>

      <button className={`${styles.line_button} ${styles.popup_button_text}`}>
        <Image
          src="camera.svg"
          alt="camera icon"
          width="20"
          height="20"
          className={styles.camera_icon}
        />
        {`Scan Other Traveler's OR code`}
      </button>
    </div>
  );
}

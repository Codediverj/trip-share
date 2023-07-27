import styles from "./Popup.module.scss";
import Image from "next/image";

export default function EditFriendsList() {
  return (
    <div>
      <h2 className={styles.popupBox_title}>Edit Traveler List</h2>
      <div className={styles.edit_friends_list}>
        <div className={styles.edit_friends_list_item}>
          <div className={styles.edit_friends_list_item_inner}>
            <Image
              src="https://images.unsplash.com/photo-1548182880-8b7b2af2caa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="profile image"
              width="30"
              height="30"
              className={styles.edit_friends_list_item_image}
            />
            <span className={styles.edit_friends_list_name}>Eunji Oh</span>

            <div className={styles.edit_friends_owner}>Owner</div>
          </div>
        </div>
        <div className={styles.edit_friends_list_item}>
          <div className={styles.edit_friends_list_item_inner}>
            <Image
              src="https://images.unsplash.com/photo-1548182880-8b7b2af2caa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="profile image"
              width="30"
              height="30"
              className={styles.edit_friends_list_item_image}
            />
            <span className={styles.edit_friends_list_name}>Mahyar Sabouniaghdam</span>
            <div className={styles.edit_friends_delete}>
              <Image src="close-blue.svg" alt="close icon" width="16" height="16" />
            </div>
          </div>
        </div>
        <div className={styles.edit_friends_list_item}>
          <div className={styles.edit_friends_list_item_inner}>
            <Image
              src="https://images.unsplash.com/photo-1548182880-8b7b2af2caa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              alt="profile image"
              width="30"
              height="30"
              className={styles.edit_friends_list_item_image}
            />
            <span className={styles.edit_friends_list_name}>Melissa Torres</span>
            <div className={styles.edit_friends_delete}>
              <Image src="close-blue.svg" alt="close icon" width="16" height="16" />
            </div>
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

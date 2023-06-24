import styles from "./Popup.module.scss";
import Image from "next/image";

export default function EditProfileImage() {
  return (
    <div>
      <h2 className={styles.popupBox_title}>Edit Profile Image</h2>
      <div className={styles.find_input_box}>
        <input
          className={styles.input_box}
          type="text"
          placeholder="Profile Image"
        />
        <button>Find Image</button>
        <div className={styles.found_image}></div>
      </div>

      <div className={`${styles.line_button} ${styles.popup_button_text}`}>
        Save
      </div>
    </div>
  );
}

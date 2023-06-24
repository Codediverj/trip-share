import styles from "./Popup.module.scss";
import Image from "next/image";

export default function EditNickname() {
  return (
    <div>
      <h2 className={styles.popupBox_title}>Edit Nickname</h2>
      <input className={styles.input_box} type="text" placeholder="Nickname" />

      <div className={`${styles.line_button} ${styles.popup_button_text}`}>
        Save
      </div>
    </div>
  );
}

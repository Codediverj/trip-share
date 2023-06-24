import styles from "./Popup.module.scss";
import Image from "next/image";

export default function DeletePlan() {
  return (
    <div>
      <h2 className={styles.popupBox_title_center}>Are You Sure?</h2>
      <p className={styles.delete_notice}>
        <span>Do you want to delete this plan?</span>
      </p>
      <div className={`${styles.cancel_button} ${styles.popup_button_text}`}>
        Cancel
      </div>
      <div className={`${styles.delete_button} ${styles.popup_button_text}`}>
        Delete
      </div>
    </div>
  );
}

import styles from "./Popup.module.scss";
import Image from "next/image";

export default function AddNewPlan() {
  return (
    <div>
      <h2 className={styles.popupBox_title}>Add New Plan</h2>

      <h3 className={styles.input_box_h3}>Title</h3>
      <input
        className={styles.input_box}
        type="text"
        placeholder="Plan Title"
      />

      <h3 className={styles.input_box_h3}>From</h3>
      <div className={styles.find_input_box}>
        <input
          className={styles.input_box}
          type="text"
          placeholder="Select Date"
        />
        <button>
          <Image
            src="/calendar.svg"
            alt="calendar icon"
            width="24"
            height="24"
            className={styles.calendar_img}
          />
        </button>
      </div>

      <h3 className={styles.input_box_h3}>To</h3>
      <div className={styles.find_input_box}>
        <input
          className={styles.input_box}
          type="text"
          placeholder="Select Date"
        />
        <button>
          <Image
            src="/calendar.svg"
            alt="calendar icon"
            width="24"
            height="24"
            className={styles.calendar_img}
          />
        </button>
      </div>

      <h3 className={styles.input_box_h3}>Background Image</h3>
      <div className={styles.find_input_box}>
        <input
          className={styles.input_box}
          type="text"
          placeholder="Profile Image"
        />
        <button>Find Image</button>
      </div>

      <h3 className={styles.input_box_h3}>Default Currency for this trip</h3>
      <input
        className={styles.input_box}
        type="text"
        placeholder="$ / ￥ / ₩ / €"
      />

      <div className={`${styles.line_button} ${styles.popup_button_text}`}>
        Save
      </div>
    </div>
  );
}

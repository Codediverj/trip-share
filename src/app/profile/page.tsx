import Image from "next/image";
import styles from "./profile.module.scss";

export default function Page() {
  return (
    <div className={`page_container ${styles.profle_main}`}>
      <div className={styles.qr_box}>qr code box</div>
      <h4>Your Traveler Code :</h4>
      <div className={styles.traveler_num}>2308 5990 7420</div>
      <span>Expired in 2:59</span>
      <div className={styles.refresh_button}>
        <div>
          <Image src="/refresh.svg" alt="refresh icon" width="16" height="16" />
          Refresh
        </div>
      </div>
      {/* maybe... component?*/}
      <div className="bottom_line_button">
        <div>Delete Account</div>
      </div>
    </div>
  );
}

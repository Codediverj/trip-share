"use client";
import Image from "next/image";
import styles from "./profile.module.scss";
import { useState } from "react";
import Popup from "../components/Popup/Popup";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  return (
    <section>
      <header>
        <div className="back_button">
          <Image
            src="/back_button.svg"
            alt="Back icon"
            width="30"
            height="30"
          />
        </div>
        <div className={styles.profle_info}>
          <div className={styles.profle_left}>
            <h3 className={styles.profle_name}>
              Eunji Oh
              <Image
                src="/edit-white.svg"
                alt="edit icon"
                width="18"
                height="18"
                onClick={openPopup}
              />
            </h3>
            <p className={styles.profle_email}>sample@gmail.com</p>
          </div>
          <div className={styles.profle_right}>
            <div className={styles.profle_image}>
              {/*profile imge Components => default or URL*/}
              <div className={styles.profle_image_wrap}>
                <Image
                  src="/profile_icon.svg"
                  alt="profile icon"
                  width="30"
                  height="30"
                />
              </div>
              <div className={styles.profle_edit_icon}>
                <Image
                  src="/edit_black.svg"
                  alt="edit icon"
                  width="19"
                  height="19"
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      {children}
      {isPopupOpen && <Popup onClose={closePopup} />}
    </section>
  );
}

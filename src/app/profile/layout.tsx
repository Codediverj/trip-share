"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./profile.module.scss";
import { profileMockData } from "./data"; //temp data

// Popup
import Popup from "../components/Popup/Popup";
import { usePopupContext } from "../contexts/PopupContext";

// Popup Content
import EditNickname from "../components/Popup/EditNickname";
import EditProfileImage from "../components/Popup/EditProfileImage";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPopupOpen, popupContent, openPopup, closePopup } =
    usePopupContext();

  return (
    <section>
      <header>
        <div className="back_button">
          <Link href={`/home`}>
            <Image
              src="/back_button.svg"
              alt="Back icon"
              width="30"
              height="30"
            />
          </Link>
        </div>
        <div className={styles.profle_info}>
          <div className={styles.profle_left}>
            <h3 className={styles.profle_name}>
              {profileMockData.name}
              <Image
                src="/edit-white.svg"
                alt="edit icon"
                width="18"
                height="18"
                onClick={() => openPopup(<EditNickname />)}
              />
            </h3>
            <p className={styles.profle_email}>{profileMockData.email}</p>
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
                  onClick={() => openPopup(<EditProfileImage />)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      {children}
      {isPopupOpen && <Popup onClose={closePopup}>{popupContent}</Popup>}
    </section>
  );
}

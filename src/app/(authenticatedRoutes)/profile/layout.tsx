"use client";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import styles from "./profile.module.scss";

// Popup
import Popup from "../../../components/Popup/Popup";
import { usePopupContext } from "../../../contexts/popup/PopupContext";
// Popup Content
import EditNickname from "../../../components/Popup/EditNickname";
import EditProfileImage from "../../../components/Popup/EditProfileImage";

//UserData(Context)
import { useUserDataStore } from "@/contexts/userData/userData.provider";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { isPopupOpen, popupContent, openPopup, closePopup } = usePopupContext();
  const userData = useUserDataStore(); //server
  const [userDataState, setUserDataState] = useState(userData); //client
  const supabase = createClientComponentClient();

  useEffect(() => {
    setUserDataState(userData);
  }, [userData]);

  const handleNicknameSave = (newNickname: string) => {
    if (!userData) {
      return;
    }
    supabase
      .from("User")
      .upsert({
        user_id: userData.userId,
        profile_image: userData.profileImage,
        nickname: newNickname,
        email: userData.email,
        traveler_code: userData.travelerCode,
      })
      .select()
      .single()
      .then(({ data, error }) => {
        console.log(data);
        if (error) {
          console.log(error);
        }
        if (data) {
          setUserDataState((prevData) => {
            if (prevData) {
              return { ...prevData, nickname: newNickname };
            }
            return prevData;
          });
          closePopup();
        }
      });
  };

  const handleProfileImageSave = (profileImage: string) => {
    if (!userData) {
      return;
    }
    supabase
      .from("User")
      .upsert({
        user_id: userData.userId,
        profile_image: userData.profileImage,
        nickname: profileImage,
        email: userData.email,
        traveler_code: userData.travelerCode,
      })
      .select()
      .single()
      .then(({ data, error }) => {
        console.log(data);
        if (error) {
          console.log(error);
        }
        if (data) {
          setUserDataState((prevData) => {
            if (prevData) {
              return { ...prevData, profile_image: profileImage };
            }
            return prevData;
          });
          closePopup();
        }
      });
  };
  return (
    <section>
      <header>
        <div className="back_button">
          <Link href={`/home`}>
            <Image src="/back_button.svg" alt="Back icon" width="30" height="30" />
          </Link>
        </div>
        <div className={styles.profle_info}>
          <div className={styles.profle_left}>
            <h3 className={styles.profle_name}>
              <span>{userDataState.nickname}</span>
              <Image
                src="/edit-white.svg"
                alt="edit icon"
                width="18"
                height="18"
                onClick={() =>
                  openPopup(
                    <EditNickname nickname={userDataState.nickname} onSave={handleNicknameSave} />
                  )
                }
              />
            </h3>
            <p className={styles.profle_email}>{userDataState.email}</p>
          </div>
          <div className={styles.profle_right}>
            <div className={styles.profle_image}>
              {/*profile imge Components => URL*/}
              <div className={styles.profle_image_wrap}>
                <Image
                  src={`${userDataState.profileImage}`}
                  alt="profile image"
                  width="80"
                  height="80"
                />
              </div>
              <div className={styles.profle_edit_icon}>
                <Image
                  src="/edit_black.svg"
                  alt="edit icon"
                  width="19"
                  height="19"
                  onClick={() =>
                    openPopup(
                      <EditProfileImage
                        profileImage={userDataState.profileImage}
                        onSave={handleProfileImageSave}
                      />
                    )
                  }
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

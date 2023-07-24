"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import Link from "next/link";
import styles from "./profile.module.scss";

//data
import { useUserData } from "../../contexts/useUserData";

// Popup
import Popup from "../../components/Popup/Popup";
import { usePopupContext } from "../../../contexts/popup/PopupContext";

// Popup Content
import EditNickname from "../../components/Popup/EditNickname";
import EditProfileImage from "../../components/Popup/EditProfileImage";
import { UserData } from "./profile.types";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { isPopupOpen, popupContent, openPopup, closePopup } = usePopupContext();
  const { userData, setUserData } = useUserData();
  const supabase = createClientComponentClient();

  const handleNicknameSave = (newNickname: string) => {
    if (!userData) {
      return;
    }
    supabase
      .from("User")
      .upsert({
        user_id: userData.user_id,
        profile_image: userData.profile_image,
        nickname: newNickname,
        email: userData.email,
        traveler_code: userData.traveler_code,
      })
      .select()
      .single()
      .then(({ data, error }) => {
        console.log(data);
        if (error) {
          console.log(error);
        }
        if (data) {
          setUserData((prevData) => {
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
        user_id: userData.user_id,
        profile_image: userData.profile_image,
        nickname: profileImage,
        email: userData.email,
        traveler_code: userData.traveler_code,
      })
      .select()
      .single()
      .then(({ data, error }) => {
        console.log(data);
        if (error) {
          console.log(error);
        }
        if (data) {
          setUserData((prevData) => {
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
              {userData && <span>{userData.nickname}</span>}
              <Image
                src="/edit-white.svg"
                alt="edit icon"
                width="18"
                height="18"
                onClick={() =>
                  openPopup(
                    <EditNickname nickname={userData?.nickname} onSave={handleNicknameSave} />
                  )
                }
              />
            </h3>
            {userData && <p className={styles.profle_email}>{userData.email}</p>}
          </div>
          <div className={styles.profle_right}>
            <div className={styles.profle_image}>
              {/*profile imge Components => URL*/}
              <div className={styles.profle_image_wrap}>
                {userData && (
                  <Image
                    src={`${userData.profile_image}`}
                    alt="profile image"
                    width="80"
                    height="80"
                  />
                )}
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
                        profileImage={userData?.profile_image}
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

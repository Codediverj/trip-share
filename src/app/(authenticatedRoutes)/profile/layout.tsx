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
import { Database } from "@/supabase.types";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { isPopupOpen, popupContent, openPopup, closePopup } = usePopupContext();
  const userData = useUserDataStore();
  const [userDataState, setUserDataState] = useState(userData);
  const supabase = createClientComponentClient<Database>();
  const [profileImageSrc, setProfileImageSrc] = useState("");

  useEffect(() => {
    setUserDataState(userData);
    if (userData && userData.profileImage) {
      fetch(`/api/imageUpload?uploadId=${userData.profileImage}`)
        .then((res) => res.json())
        .then(setProfileImageSrc);
    }
  }, [userData]);

  const handleNicknameSave = (newNickname: string) => {
    if (!userData) {
      return;
    }
    supabase
      .from("User")
      .update({
        nickname: newNickname,
      })
      .eq("user_id", userData.userId)
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
      .update({
        profile_image: profileImage,
      })
      .eq("user_id", userData.userId)
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
                <Image src={profileImageSrc} alt="profile image" width="80" height="80" />
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
                        profileImage={profileImageSrc}
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

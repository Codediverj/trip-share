"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
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
import { UserData } from "./profile.types";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPopupOpen, popupContent, openPopup, closePopup } =
    usePopupContext();

  const [userData, setUserData] = useState<UserData>();

  const supabase = createClientComponentClient();
  useEffect(() => {
    // const fetchUserData = async () => {
    //   const { data, error } = await supabase
    //     .from("User")
    //     .select("user_id, profile_image, nickname, email, traveler_code");

    //   if (error) {
    //     console.log(error);
    //   }
    //   if (data) {
    //     console.log(data);
    //   }
    // };

    // fetchUserData();

    // (async () => {
    //   const { data, error } = await supabase
    //     .from("User")
    //     .select("user_id, profile_image, nickname, email, traveler_code");

    //   if (error) {
    //     console.log(error);
    //   }
    //   if (data) {
    //     console.log(data);
    //   }
    // })();

    supabase
      .from("User")
      .select("user_id, profile_image, nickname, email, traveler_code")
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        }
        if (data) {
          console.log(data);
          setUserData(data);
        }

        console.log("done first");

        return supabase
          .from("User")
          .select("user_id, nickname, email, traveler_code")
          .single();
      })
      .then(({ data }) => {
        console.log(data);
      });
  }, []);

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
              {userData && <span>{userData.nickname}</span>}
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

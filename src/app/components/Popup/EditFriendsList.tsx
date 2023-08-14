import { useState, useEffect } from "react";
import styles from "./Popup.module.scss";
import Image from "next/image";
import { getFriends, searchIdByCode } from "@/app/api/plan/plan.apis";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FriendsList } from "@/app/api/plan/FriendsList.types";

//UserData(Context)
import { useUserDataStore } from "@/contexts/userData/userData.provider";

export default function EditFriendsList({ planId }: { planId: string }) {
  const supabase = createClientComponentClient();
  const userData = useUserDataStore();
  const [friendsData, setFriendsData] = useState<FriendsList[] | undefined>([]);
  const [newTravelerCode, setNewTravelerCode] = useState("");
  const [noticeMessage, setNoticeMessage] = useState("");

  useEffect(() => {
    getFriends(supabase, planId)
      .then((data) => {
        //console.log(data);
        setFriendsData(data);
      })
      .catch((error) => console.error(error));
  }, [supabase, planId]);

  const handleTravelerCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTravelerCode(event.target.value);
  };

  const addTraveler = () => {
    const matchingFriend = friendsData?.find((friend) => friend.travelerCode === newTravelerCode);
    setNoticeMessage("");

    if (matchingFriend) {
      setNoticeMessage(
        `${matchingFriend.nickname}[${matchingFriend.travelerCode}] is already a joined traveler.`
      );
      setNewTravelerCode("");
    } else {
      setNewTravelerCode("");

      //코드와 관련된 user_id불러오기
      searchIdByCode(supabase, newTravelerCode)
        .then((data) => {
          fetch("/api/addTraveler", {
            method: "POST",
            body: JSON.stringify({
              userId: data,
              planId: planId,
            }),
          });
        })
        .catch((error) => {
          console.error(error);
          setNoticeMessage("The Traveler does not exist.");
        });
    }
  };

  const deleteTraveler = (userId: string) => {
    console.log(userId);

    fetch("/api/deleteTraveler", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        planId: planId,
      }),
    });

    return;
  };

  return (
    <div>
      <h2 className={styles.popupBox_title}>Edit Traveler List</h2>
      <div className={styles.edit_friends_list}>
        {friendsData &&
          friendsData.map((friend, index) => (
            <div className={styles.edit_friends_list_item} key={index}>
              <div className={styles.edit_friends_list_item_inner}>
                <Image
                  src={friend.profileImage || "/profile_default_image.svg"}
                  alt="profile image"
                  width="30"
                  height="30"
                  className={styles.edit_friends_list_item_image}
                />
                <span className={styles.edit_friends_list_name}>{friend.nickname}</span>
                {userData.userId === friend.userId ? (
                  <div className={styles.edit_friends_owner}>Me</div>
                ) : (
                  <div className={styles.edit_friends_owner}></div>
                )}
                {friendsData.length < 2 ? (
                  ""
                ) : (
                  <Image
                    src="/close-blue.svg"
                    alt="delete"
                    width="16"
                    height="16"
                    className={styles.edit_friend_delete}
                    onClick={() => deleteTraveler(friend.userId)}
                  />
                )}
              </div>
            </div>
          ))}
      </div>

      <h2 className={styles.popupBox_title}>Add Traveler</h2>
      <div className={styles.add_traveler}>
        <span>To add someone to your friend list,</span>
        <span>enter their Traveler Code.</span>
        <input
          className={styles.input_box_code}
          type="text"
          placeholder="0000 0000 0000"
          value={newTravelerCode}
          onChange={handleTravelerCodeChange}
        />
        <span className="notice_message">{noticeMessage}</span>
        <button className={styles.add_traveler_button} onClick={addTraveler}>
          Add Traveler
        </button>
      </div>

      <button className={`${styles.line_button} ${styles.popup_button_text}`}>
        <Image
          src="camera.svg"
          alt="camera icon"
          width="20"
          height="20"
          className={styles.camera_icon}
        />
        {`Scan Other Traveler's OR code`}
      </button>
    </div>
  );
}

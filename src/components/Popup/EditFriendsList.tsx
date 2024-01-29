import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./Popup.module.scss";
import Image from "next/image";
import { searchIdByCode } from "@/app/api/plan/plan.apis";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

//UserData(Context)
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { usePopupContext } from "../../contexts/popup/PopupContext";
import { usePlanDataStore } from "@/contexts/planData/planData.provider";
import DefaultText from "../Form/DefaultText";
import { ImageWithFetch } from "../ImageWithFetch";

const initialSearchResultUser = {
  userId: "",
  travelerCode: "",
  nickname: "",
};
const initialDeleteUser = {
  userId: "",
  travelerCode: "",
  nickname: "",
};
export default function EditFriendsList({ planId }: { planId: string }) {
  const router = useRouter();
  const { closePopup } = usePopupContext();
  const supabase = createClientComponentClient();
  const userData = useUserDataStore();
  const planContextData = usePlanDataStore();
  const [newTravelerCode, setNewTravelerCode] = useState("");
  const [canRegister, setCanRegister] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState("");
  const [searchResultUser, setSearchResultUser] = useState(initialSearchResultUser);
  const [clickDelete, setClickDelete] = useState(false);
  const [deleteUser, setDeleteUser] = useState(initialDeleteUser);

  const handleTravelerCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTravelerCode(event.target.value);
  };
  const searchTraveler = async () => {
    try {
      const FindUser = await searchIdByCode(supabase, newTravelerCode);
      setNoticeMessage("");
      setSearchResultUser(initialSearchResultUser);
      setCanRegister(false);
      const matchingFriend = planContextData.peopleJoin?.find(
        (friend) => friend.userId === FindUser.userId
      );
      setSearchResultUser(FindUser);
      if (matchingFriend) {
        setNoticeMessage("This Traveler is already joined.");
        setNewTravelerCode("");
      } else {
        setNoticeMessage("Do you want to add this traveler to the plan?");
        setCanRegister(true);
        setNewTravelerCode("");
      }
    } catch (error) {
      setNoticeMessage("The Traveler does not exist.");
      setNewTravelerCode("");
    }
  };

  const addTraveler = (userId: string) => {
    fetch("/api/addTraveler", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        planId: planId,
      }),
    })
      .then((response) => {
        if (response.ok) {
          setNoticeMessage("");
          setSearchResultUser(initialSearchResultUser);
          setCanRegister(false);
        } else {
          setNoticeMessage("The Traveler does not exist.");
        }
      })
      .catch((error) => {
        console.error(error);
        setNoticeMessage("An error occurred.");
      });
  };

  const deleteTraveler = (userId: string) => {
    fetch("/api/deleteTraveler", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        planId: planId,
      }),
    }).then(() => {
      setNoticeMessage("");
      setSearchResultUser(initialSearchResultUser);
      setCanRegister(false);
      setClickDelete(false);
      if (userData && userData.userId === userId) {
        router.push("/home");
        closePopup();
      }
    });

    return;
  };

  return (
    <>
      <div className={styles.edit_friends_list_wrap}>
        <h2 className={styles.popupBox_title}>Edit Traveler List</h2>
        <div className="edit_friends_list">
          {planContextData.peopleJoin &&
            planContextData.peopleJoin.map((friend, index) => (
              <div className="edit_friends_list_item" key={index}>
                <div className="edit_friends_list_item_inner">
                  <div className="left_info">
                    <ImageWithFetch
                      uploadId={friend.profileImage || ""}
                      alt="image"
                      width={30}
                      height={30}
                      imgType="profile"
                      className="edit_friends_list_item_image"
                    />

                    <span className="edit_friends_list_name">{`${friend.nickname} (${friend.travelerCode})`}</span>
                    {userData.userId === friend.userId ? (
                      <div className="edit_friends_owner">Me</div>
                    ) : (
                      <div className="edit_friends_owner"></div>
                    )}
                  </div>
                </div>
                {planContextData.peopleJoin.length > 1 && clickDelete === false && (
                  <Image
                    src="/close-blue.svg"
                    alt="delete"
                    width="16"
                    height="16"
                    className="edit_friend_delete"
                    onClick={() => {
                      setClickDelete(true);
                      setDeleteUser({
                        userId: friend.userId,
                        travelerCode: friend.travelerCode,
                        nickname: friend.nickname || "",
                      });
                    }}
                  />
                )}
                {clickDelete && friend.userId == deleteUser.userId && (
                  <div className="delete_check_box">
                    <div className="delete_check_text">{`Do you want to remove this traveler(${deleteUser.nickname}) from the plan?`}</div>
                    <div>
                      <button
                        className="delete_yes"
                        onClick={() => deleteTraveler(deleteUser.userId)}
                      >
                        Delete
                      </button>
                      <button className="delete_no" onClick={() => setClickDelete(false)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>

        <h2 className={styles.popupBox_title_half_margin}>Add Traveler</h2>
        <div className="add_traveler">
          <div className="add_description">
            <span>To add someone to your friend list,</span>
            <span>enter their Traveler Code.</span>
          </div>
          <DefaultText
            name="TravelerCode"
            value={newTravelerCode}
            onChange={handleTravelerCodeChange}
            placeholder={"0000"}
            codeInput={true}
          />
          {/* <span className="or">- OR -</span>
          <button className={`${styles.line_button} scan_button`}>
            <Image
              src="/camera.svg"
              alt="camera icon"
              width="20"
              height="20"
              className="camera_icon"
            />
            Scan QR code
          </button> */}
          {newTravelerCode !== "" && (
            <button className="search_traveler_button" onClick={searchTraveler}>
              Search Traveler
            </button>
          )}
        </div>
        {noticeMessage !== "" && (
          <div className="search_result">
            <div>{`${searchResultUser.nickname}(${searchResultUser.travelerCode})`}</div>
            <span className={`${canRegister ? "blue" : ""} notice_message`}>{noticeMessage}</span>
          </div>
        )}
        {canRegister && (
          <button
            className="add_traveler_button"
            onClick={() => addTraveler(searchResultUser.userId)}
          >
            Add Traveler
          </button>
        )}
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomePage.module.scss";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getMyPlanIds, getOtherUserIds } from "@/app/api/main/main.apis";

// context
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { User } from "@/app/api/user/user.types";
import { planFriends } from "@/app/api/main/planFriends.types";

const supabase = createClientComponentClient();

function PlanWithList() {
  const userData = useUserDataStore();
  const [otherUserData, setOtherUserData] = useState<planFriends>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData.userId) {
          const myPlanIds = await getMyPlanIds(supabase, userData.userId);
          const otherUserIds = await getOtherUserIds(supabase, myPlanIds, userData.userId);

          setOtherUserData(otherUserIds);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userData.userId]);

  return (
    <>
      <div className={styles.plan_with}>
        <h3 className={styles.dashboard_title}>I plan trip with...</h3>
        <ul>
          {otherUserData.length > 0 &&
            otherUserData.map((friend) => (
              <li key={friend.user_id}>
                <Image
                  src={friend.User?.profile_image ? friend.User.profile_image : "기본 이미지 URL"}
                  alt="profile image"
                  width="50"
                  height="50"
                />
                <h5 className="plan_with_name">{friend.User?.nickname}</h5>
                <h6 className="plan_with_code">{friend.User?.traveler_code}</h6>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default PlanWithList;

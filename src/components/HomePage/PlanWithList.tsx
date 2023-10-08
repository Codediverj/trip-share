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

const supabase = createClientComponentClient();

function PlanWithList({ randomImage }: any) {
  const userData = useUserDataStore();
  const [otherUserData, setOtherUserData] = useState([{}]);

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
  }, [supabase, userData.userId]);

  console.log(otherUserData);

  return (
    <>
      <div className={styles.plan_with}>
        <h3 className={styles.dashboard_title}>I plan trip with...</h3>
        {/* {otherUserData.length > 0 &&
          otherUserData.map((friend) => (
            <li key={friend.user_id}>
              <Image
                src={friend.User.profile_image ? friend.User.profile_image : "기본 이미지 URL"}
                alt="profile image"
                width="50"
                height="50"
              />
              {friend.user_id}
            </li>
          ))} */}

        <ul>
          <li>
            <Image src={randomImage} alt="plus icon" width="50" height="50" />
          </li>
        </ul>
      </div>
    </>
  );
}

export default PlanWithList;

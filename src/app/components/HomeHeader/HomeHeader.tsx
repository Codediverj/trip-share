"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./HomeHeader.module.scss";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

//supabase
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { listPlan } from "@/app/api/plan/plan.apis";

function HomeHeader() {
  const supabase = createClientComponentClient();
  const userData = useUserDataStore();
  const [planAllListNum, setPlanAllListNum] = useState(0);
  useEffect(() => {
    listPlan(supabase, userData.userId)
      .then((data) => setPlanAllListNum(data.length))
      .catch((error) => console.error(error));
  }, [supabase, userData.userId]);

  return (
    <header>
      <h2 className={styles.header_h2}>{`${userData.nickname}'s Trips`}</h2>
      <div className={styles.info_box}>
        <div>
          <div>
            <strong>0</strong>
            <span>Country</span>
          </div>
          <div>
            <strong>0</strong>
            <span>Cities</span>
          </div>
          <div>
            <strong>{planAllListNum}</strong>
            <span>Plan</span>
          </div>
        </div>
      </div>
      <div className={styles.profile_button}>
        <Link href={`/profile`}>
          <Image src={userData.profileImage} alt="plus icon" width="50" height="50" />
        </Link>
      </div>
    </header>
  );
}

export default HomeHeader;

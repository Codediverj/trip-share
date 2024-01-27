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
import { Plan } from "@/app/api/plan/plan.types";
import { subscribeToChannel } from "@/utils/supabaseRealtime.utils";

function HomeHeader() {
  const supabase = createClientComponentClient();
  const userData = useUserDataStore();
  const [planAllList, setPlanAllList] = useState<Plan[]>([]);
  useEffect(() => {
    if (userData.userId) {
      listPlan(supabase, userData.userId)
        .then((data) => setPlanAllList(data))
        .catch((error) => console.error(error));
    }
    const channel = subscribeToChannel(supabase, (payload) => {
      listPlan(supabase, userData.userId).then(setPlanAllList).catch(console.error);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, userData.userId]);

  const today = new Date();
  const pastPlans = planAllList.filter((plan) => new Date(plan.endDate) < today);
  const futurePlans = planAllList.filter((plan) => new Date(plan.endDate) >= today);

  const [profileImageSrc, setProfileImageSrc] = useState("");

  useEffect(() => {
    if (userData && userData.profileImage) {
      fetch(`/api/imageUpload?uploadId=${userData.profileImage}`)
        .then((res) => res.json())
        .then(setProfileImageSrc);
    }
  }, [userData]);

  return (
    <header>
      <h2 className={styles.header_h2}>{`${userData.nickname}'s Trips`}</h2>
      <div className={styles.info_box}>
        <div>
          <div>
            <strong>{futurePlans.length}</strong>
            <span>Planning</span>
          </div>
          <div>
            <strong>{pastPlans.length}</strong>
            <span>travelled</span>
          </div>
          <div>
            <strong>{planAllList.length}</strong>
            <span>Total</span>
          </div>
        </div>
      </div>
      <div className={styles.profile_button}>
        {userData.profileImage && (
          <Link href={`/profile`}>
            <Image src={profileImageSrc} alt="plus icon" width="40" height="40" />
          </Link>
        )}
      </div>
    </header>
  );
}

export default HomeHeader;

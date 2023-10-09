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
  }, [supabase, userData.userId]);

  const today = new Date();
  const pastPlans = planAllList.filter((plan) => new Date(plan.endDate) < today);
  const futurePlans = planAllList.filter((plan) => new Date(plan.endDate) >= today);

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
        <Link href={`/profile`}>
          <Image src={userData.profileImage} alt="plus icon" width="40" height="40" />
        </Link>
      </div>
    </header>
  );
}

export default HomeHeader;

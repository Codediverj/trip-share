"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../plan.module.scss";
import { useState, useEffect } from "react";
import { profileMockData } from "../data"; //temp data
import Page from "./page";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Popup
import Popup from "../../../../components/Popup/Popup";
import { usePopupContext } from "../../../../contexts/popup/PopupContext";

// Popup Content
import EditFriendsList from "../../../../components/Popup/EditFriendsList";
import EditPlan from "@/components/Popup/EditPlan";

//UserData(Context)
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { getPlan } from "@/app/api/plan/plan.apis";
import { getFriends } from "@/app/api/plan/plan.apis";
//types
import { Plan } from "../../../api/plan/plan.types";

import { usePlanDataStore } from "@/contexts/planData/planData.provider";

//util
import { formatDateStartEnd } from "../../../../utils/formatDateStartEnd.utils";
import { totaldays } from "../../../../utils/totaldays.utils";
import { cx } from "@/utils/classname.utils";
import DayPlan from "@/components/PlanPage/DayPlan";
import Expense from "@/components/PlanPage/Expense";
import Moment from "@/components/PlanPage/Moment";
import { FriendsList } from "@/app/api/plan/FriendsList.types";
import { SampleProvider } from "@/contexts/sample/sample.provider";

export default function PlanPage({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const { isPopupOpen, popupContent, openPopup, closePopup } = usePopupContext();
  const supabase = createClientComponentClient();
  const userData = useUserDataStore();
  const [planContent, setPlanContent] = useState<Plan | undefined>(undefined);
  const [friendsData, setFriendsData] = useState<FriendsList[] | undefined>([]);
  const planId = params.id;
  const planContextData = usePlanDataStore();
  //console.log(planContextData);

  useEffect(() => {
    getPlan(supabase, planId)
      .then((data) => setPlanContent(data))
      .catch((error) => console.error(error));
  }, [supabase, planId]);

  useEffect(() => {
    getFriends(supabase, planId)
      .then((data) => setFriendsData(data))
      .catch((error) => console.error(error));

    const channel = supabase
      .channel("whateve23")
      .on("postgres_changes", { event: "*", schema: "public", table: "*" }, (payload) => {
        // console.log(payload);
        getFriends(supabase, planId)
          .then((data) => setFriendsData(data))
          .catch((error) => console.error(error));
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, planId]);

  const totalDays = planContent ? totaldays(planContent.startDate, planContent.endDate) : 0;

  return (
    <section>
      <header className={styles.plan_header}>
        <Image
          src={profileMockData.background}
          alt="Background"
          width="900"
          height="700"
          className={styles.plan_background}
        />
        <div className="back_button">
          <Link href={`/home`}>
            <Image src="/back_button.svg" alt="Back icon" width="30" height="30" />
          </Link>
        </div>
        <div className={styles.plan_info}>
          <div className={styles.plan_title}>
            {planContent?.title}
            <div
              className={styles.plan_edit_button}
              onClick={() =>
                openPopup(
                  <EditPlan planContent={planContent as Plan} setPlanContent={setPlanContent} />
                )
              }
            >
              <Image src="/edit_purple.svg" alt="edit icon" width="12" height="12" />
              Edit
            </div>
          </div>
          <div className={styles.plan_date}>
            {planContent ? formatDateStartEnd(planContent.startDate, planContent.endDate) : ""}
          </div>
        </div>
        <div
          className={styles.friend_join}
          onClick={() => openPopup(<EditFriendsList planId={planId} />)}
        >
          <strong>{friendsData && friendsData.length}</strong> people join
          <div>+</div>
        </div>
        <div className={styles.main_tab}>
          <button
            className={cx("main_tab1", activeTab === 0 ? "active" : "")}
            onClick={() => handleTabClick(0)}
          >
            Day Plan
          </button>
          <button
            className={cx("main_tab2", activeTab === 1 ? "active" : "")}
            onClick={() => handleTabClick(1)}
          >
            Expense
          </button>
          <button
            className={cx("main_tab3", activeTab === 2 ? "active" : "")}
            onClick={() => handleTabClick(2)}
          >
            Moment
          </button>
        </div>
      </header>
      <div className="page_container_swipe">
        <div className="tab-content">
          {activeTab === 0 && (
            <SampleProvider>
              <DayPlan totaldays={totalDays} />
            </SampleProvider>
          )}
          {activeTab === 1 && <Expense />}
          {activeTab === 2 && <Moment />}
        </div>
      </div>
      {isPopupOpen && <Popup onClose={closePopup}>{popupContent}</Popup>}
    </section>
  );
}

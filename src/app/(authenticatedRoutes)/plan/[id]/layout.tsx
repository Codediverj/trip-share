"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "../plan.module.scss";
import { useState, useEffect } from "react";
import { profileMockData } from "../data"; //temp data
import Page from "./page";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// Popup
import Popup from "../../../components/Popup/Popup";
import { usePopupContext } from "../../../../contexts/popup/PopupContext";

// Popup Content
import EditFriendsList from "../../../components/Popup/EditFriendsList";
import AddNewPlan from "../../../components/Popup/AddNewPlan";

//UserData(Context)
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { getPlan } from "@/app/api/plan/plan.apis";
//types
import { Plan } from "../../../api/plan/plan.types";

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const { isPopupOpen, popupContent, openPopup, closePopup } = usePopupContext();

  const supabase = createClientComponentClient();
  const userData = useUserDataStore();
  // const [singlePlanList, setSinglePlanList] = useState<Plan>();

  // useEffect(() => {
  //   getPlan(supabase, userData.userId)
  //     .then((data) => setSinglePlanList(data))
  //     .catch((error) => console.error(error));
  // }, [supabase, userData.userId]);

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
            2023 New York
            <div className={styles.plan_edit_button} onClick={() => openPopup(<AddNewPlan />)}>
              <Image src="/edit_purple.svg" alt="edit icon" width="12" height="12" />
              Edit
            </div>
          </div>
          <div className={styles.plan_date}>Nov.12 ~ Dec.2 2023</div>
        </div>
        <div className={styles.friend_join} onClick={() => openPopup(<EditFriendsList />)}>
          <strong>1</strong> people join
          <div>+</div>
        </div>
        <div className={styles.main_tab}>
          <button
            className={`main_tab1 ${activeTab === 0 ? "active" : ""}`}
            // className={cx(
            //   "sub_tab_item",
            //   activeSubTab === 2 ? "active" : ""
            // )}
            onClick={() => handleTabClick(0)}
          >
            Day Plan
          </button>
          <button
            className={`main_tab2 ${activeTab === 1 ? "active" : ""}`}
            onClick={() => handleTabClick(1)}
          >
            Expense
          </button>
          <button
            className={`main_tab3 ${activeTab === 2 ? "active" : ""}`}
            onClick={() => handleTabClick(2)}
          >
            Moment
          </button>
        </div>
      </header>
      <div className="page_container_swipe">
        <Page activeTab={activeTab} />
      </div>
      {isPopupOpen && <Popup onClose={closePopup}>{popupContent}</Popup>}
    </section>
  );
}

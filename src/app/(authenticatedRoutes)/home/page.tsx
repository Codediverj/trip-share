"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import styles from "./page.module.scss";

// Popup
import Popup from "../../components/Popup/Popup";
import { usePopupContext } from "../../../contexts/popup/PopupContext";

//UserData(Context)
import { useUserDataStore } from "@/contexts/userData/userData.provider";

// components
import AddNewButton from "../../components/AddNewButton";
import SwiperComp from "../../components/Swiper/Swiper";
import MainImage from "../../components/HomePage/MainImage";
import PlanWithList from "../../components/HomePage/PlanWithList";
import { listPlan } from "@/app/api/plan/plan.apis";

//types
import { Plan } from "../../api/plan/plan.types";

//util
import { formatDateStartEnd } from "../../utils/formatDateStartEnd.utils";

export default function HomePage() {
  const defaultPlanImage =
    "https://images.unsplash.com/photo-1543158266-0066955047b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";

  const { isPopupOpen, popupContent, openPopup, closePopup } = usePopupContext();

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

  const currentDate = new Date();
  const pastPlans = planAllList.filter((plan) => new Date(plan.endDate) < currentDate);
  const futurePlans = planAllList.filter((plan) => new Date(plan.endDate) >= currentDate);

  return (
    <>
      <main>
        <div className="page_container">
          <div className={styles.continue_plan}>
            <h3 className={styles.dashboard_title}>Continue Planning</h3>
            {futurePlans.map((plan) => (
              <MainImage
                key={plan.planId}
                id={plan.planId}
                backgroundImage={plan.backgroundImage || defaultPlanImage}
                planTitle={plan.title}
                date={formatDateStartEnd(plan.startDate, plan.endDate)}
              />
            ))}
            <AddNewButton />
          </div>
        </div>
        <div className={styles.completed}>
          <h3 className={styles.dashboard_title}>Completed</h3>
          <SwiperComp pastPlans={pastPlans} />
          <div className={styles.completed_swipe}>
            <div className={styles.completed_swipe_item}></div>
          </div>
        </div>
        <div className="container">
          <PlanWithList randomImage={defaultPlanImage} />
        </div>
      </main>
      {isPopupOpen && <Popup onClose={closePopup}>{popupContent}</Popup>}
      <footer>Footer</footer>
    </>
  );
}

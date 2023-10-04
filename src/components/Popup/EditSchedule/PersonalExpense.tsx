"use client";
import styles from "../Popup.module.scss";

//useContext
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { SinglePlan } from "./EditSchedule.types";

interface PersonalExpenseProps {
  planData: Omit<SinglePlan, "singlePlanId" | "planId">;
  setPlanData: React.Dispatch<React.SetStateAction<Omit<SinglePlan, "singlePlanId" | "planId">>>;
}

export default function PersonalExpense({ planData, setPlanData }: PersonalExpenseProps) {
  const userData = useUserDataStore();
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setPlanData((prevPlanData) => ({
      ...prevPlanData,
      [name]: value,
    }));
  };

  const handlePersonalPaid = (event: any) => {
    const { value } = event.target;
    const paidID = value === "yes" ? userData.userId : "";
    setPlanData((prevData) => ({
      ...prevData,
      paidID: paidID,
    }));
  };

  return (
    <div className={styles.personal_payment}>
      <div className={styles.personal_total_expense}>
        <span>$</span>
        <input
          className={styles.personal_total_expense_input}
          type="text"
          placeholder="0"
          name="expense"
          value={planData.expense}
          onClick={(event) => event.currentTarget.select()}
          onChange={handleInputChange}
        />
        <span>Per Person</span>
      </div>
      {planData.expense > 0 && (
        <>
          <h3 className={styles.input_box_h3}>Have you already made the payment?</h3>
          <div className={styles.radio_container}>
            <input
              type="radio"
              className={styles.radio_input}
              name="personal-payment"
              value="yes"
              onChange={handlePersonalPaid}
              checked={planData.paidID === userData.userId}
            />
            <label className={styles.radio_label}>Yes</label>
          </div>
          <div className={styles.radio_container}>
            <input
              type="radio"
              className={styles.radio_input}
              name="personal-payment"
              value="no"
              onChange={handlePersonalPaid}
              checked={planData.paidID !== userData.userId}
            />
            <label className={styles.radio_label}>No</label>
          </div>
        </>
      )}
    </div>
  );
}

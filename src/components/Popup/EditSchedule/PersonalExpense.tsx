"use client";
import styles from "../Popup.module.scss";

//useContext
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { SinglePlan } from "./EditSchedule.types";
import RadioInput from "@/components/Form/RadioInput";
import DefaultTextExpense from "@/components/Form/DefaultTextExpense";

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
      <DefaultTextExpense
        placeholder="0"
        name="expense"
        value={planData.expense}
        onClick={(event) => event.currentTarget.select()}
        onChange={handleInputChange}
        nextText={"per person"}
        isGroupActivity={planData.isGroupActivity}
      />
      {planData.expense > 0 && (
        <>
          <h3 className={styles.input_box_h3}>Have you already made the payment?</h3>
          <RadioInput
            name="personal-payment"
            value="yes"
            onChange={handlePersonalPaid}
            checked={planData.paidID === userData.userId}
            labelText="Yes"
          />
          <RadioInput
            name="personal-payment"
            value="no"
            onChange={handlePersonalPaid}
            checked={planData.paidID !== userData.userId}
            labelText="No"
          />
        </>
      )}
    </div>
  );
}

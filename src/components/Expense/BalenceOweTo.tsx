import { useEffect } from "react";
import Image from "next/image";
import { useExpenseDataStore } from "@/contexts/expenseData/expenseData.provider";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import ExpenseItem from "./ExpenseItem";

function BalenceOweTo() {
  const userData = useUserDataStore();
  const allExpenseData = useExpenseDataStore();

  //

  return (
    <div className="owe_expense">
      <h4 className="owe_expense_title">
        <Image
          src="/expense_arrow_right.svg"
          alt="friend name"
          width="24"
          height="24"
          className="profile image"
        />
        <span>{`'s Balence owe to`}</span>
        <Image
          src="/expense_arrow_right.svg"
          alt="friend name"
          width="24"
          height="24"
          className="profile image"
        />
      </h4>
      <div className="owe_expense_con">
        <ul className="expense_list">
          {allExpenseData.map((data) => (
            <ExpenseItem key={data.singlePlanId} data={data} />
          ))}
        </ul>
        <div className="send_money">
          <p>Did you repay the money owed to {`'A'`} ?</p>
          <button>Yes, I did</button>
        </div>
      </div>
    </div>
  );
}

export default BalenceOweTo;

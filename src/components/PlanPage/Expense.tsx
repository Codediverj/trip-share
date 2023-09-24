import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Expense.module.scss";
import { useExpenseDataStore } from "@/contexts/expenseData/expenseData.provider";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import { usePopupContext } from "../../contexts/popup/PopupContext";
import { DateTime } from "luxon";
import EditSchedule from "../Popup/EditSchedule/EditSchedule";
import { formatDate } from "@/utils/formatDate.utils";

function Expense() {
  const userData = useUserDataStore();
  const { openPopup } = usePopupContext();
  const allExpenseData = useExpenseDataStore();

  const filteredMyExpenses = allExpenseData.filter((item) =>
    item.Single_Plan_Expense.some(
      (expenseItem) => expenseItem.paidUser && expenseItem.paidUser.paidUserId === userData.userId
    )
  );

  type ExpenseItem = {
    expenseId: number;
    expense: number;
    attendedUser: {
      attendedUserId: string;
      attendedUserNickname?: string;
      attendedUserImage?: string;
    };
    paidUser?: {
      paidUserId: string;
      paidUserrNickname?: string;
      paidUserUserImage?: string;
    };
  };
  function myExpense(expenseData: ExpenseItem[], userId: string) {
    const expenseItem = expenseData.find(
      (expenseItem) => expenseItem.paidUser && expenseItem.paidUser.paidUserId === userId
    );
    return expenseItem ? expenseItem.expense : 0;
  }

  const totalExpense = filteredMyExpenses.reduce((total, data) => {
    const expense = myExpense(data.Single_Plan_Expense, userData.userId);
    return total + expense;
  }, 0);

  return (
    <div className="page_container_middle page_gray_bg">
      <div className={styles.expense}>
        <div className="total_expense">
          <div className="total_expense_head">
            <h4>My Total Expense</h4>
            <h5>$ {totalExpense.toFixed(2)}</h5>
          </div>

          <ul className="expense_list">
            {filteredMyExpenses.map((data) => (
              <li key={data.singlePlanId}>
                <div className="expense_con">
                  <h6>{data.placeFromName}</h6>
                  <span>{formatDate(data.date)}</span>
                </div>
                <button
                  className="expense_price"
                  onClick={() => openPopup(<EditSchedule data={data} />)}
                >
                  <span className="number">
                    $ {myExpense(data.Single_Plan_Expense, userData.userId)}
                  </span>
                  <Image
                    src="/expense_arrow_right.svg"
                    alt="detail icon"
                    width="18"
                    height="18"
                    className="detail"
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>

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
              <li>
                <div className="expense_con">
                  <h6>City Tour Bus</h6>
                  <span>Aug 18</span>
                </div>
                <Link href="" className="expense_price">
                  <span className="number">$350</span>
                  <Image
                    src="/expense_arrow_right.svg"
                    alt="detail icon"
                    width="18"
                    height="18"
                    className="detail"
                  />
                </Link>
              </li>
            </ul>
            <div className="send_money">
              <p>Did you repay the money owed to {`'A'`} ?</p>
              <button>Yes, I did</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expense;

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Expense.module.scss";
import { useExpenseDataStore } from "@/contexts/expenseData/expenseData.provider";

function Expense() {
  const expenseData = useExpenseDataStore();
  console.log(expenseData);

  return (
    <div className="page_container_middle page_gray_bg">
      <div className={styles.expense}>
        <div className="total_expense">
          <div className="total_expense_head">
            <h4>My Total Expense</h4>
            <h5>$ 189.00</h5>
          </div>
          {/* 아이템 갯수만큼 늘어나야함 */}
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

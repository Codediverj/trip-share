import React from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Expense.module.scss";

function Expense() {
  return (
    <div className="page_container_middle page_gray_bg">
      <div className={styles.expense}>
        <div className="total_expense">
          <div className="total_expense_head">
            <h4>Total Expense</h4>
            <h5>$ 189.00</h5>
          </div>
          {/* 아이템 갯수만큼 늘어나야함 */}
          <ul className="expense_list">
            <li>
              <div className="expense_con">
                <h6>City Tour Bus</h6>
                <span>Aug 18</span>
              </div>
              <div className="expense_price">$350</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Expense;

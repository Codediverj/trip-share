import styles from "./Expense.module.scss";
import { useExpenseDataStore } from "@/contexts/expenseData/expenseData.provider";
import { useUserDataStore } from "@/contexts/userData/userData.provider";
import BalenceOweTo from "../Expense/BalenceOweTo";
import ExpenseItem from "../Expense/ExpenseItem";
import { myExpense, ExpenseItemType as ExpenseItemType } from "@/utils/myExpense.utils";

function Expense() {
  const userData = useUserDataStore();
  const allExpenseData = useExpenseDataStore();

  const filteredMyExpenses = allExpenseData.filter((item) =>
    item.Single_Plan_Expense.some(
      (expenseItem) => expenseItem.paidUser && expenseItem.paidUser.paidUserId === userData.userId
    )
  );
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
              <ExpenseItem key={data.singlePlanId} data={data} />
            ))}
          </ul>
        </div>

        <BalenceOweTo />
      </div>
    </div>
  );
}

export default Expense;

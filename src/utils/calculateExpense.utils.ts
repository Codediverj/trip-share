import { Expense } from "@/components/Popup/EditSchedule/EditSchedule.types";

export const calculateExpense = (isGroupActivity: boolean, expenses: { expense: number }[]) => {
  if (isGroupActivity) {
    return expenses.reduce((total, expenseItem) => total + expenseItem.expense, 0);
  } else {
    const totalExpense = expenses.reduce((total, expenseItem) => total + expenseItem.expense, 0);
    return expenses.length > 0 ? totalExpense / expenses.length : 0;
  }
};

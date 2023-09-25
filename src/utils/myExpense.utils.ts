export type ExpenseItemType = {
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

export function myExpense(expenseData: ExpenseItemType[], userId: string) {
  const expenseItem = expenseData.find(
    (expenseItem) => expenseItem.paidUser && expenseItem.paidUser.paidUserId === userId
  );
  const expenseOthers = expenseData[0].expense;
  return expenseItem ? expenseItem.expense : expenseOthers;
}

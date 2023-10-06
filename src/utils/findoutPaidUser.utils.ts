import { Expense } from "@/components/Popup/EditSchedule/EditSchedule.types";

export const findOutPaidUser = (
  isGroupActivity: boolean,
  singlePlanExpenses: Expense[],
  userId: string
): string => {
  const paidUserArray = makePaidUserArray(singlePlanExpenses);
  if (isGroupActivity) {
    return paidUserArray[0];
  } else {
    const matchingExpense = paidUserArray.find((paidId) => paidId === userId);
    return matchingExpense ? matchingExpense : "";
  }
};

function makePaidUserArray(singlePlanExpenses: Expense[]): string[] {
  const paidUserIds: string[] = [];

  singlePlanExpenses.forEach((expense) => {
    const paidUserId = expense.paidUser?.paidUserId;
    if (paidUserId) {
      paidUserIds.push(paidUserId);
    }
  });
  return paidUserIds;
}

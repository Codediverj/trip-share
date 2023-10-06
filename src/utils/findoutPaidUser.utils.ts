import { Expense } from "@/components/Popup/EditSchedule/EditSchedule.types";

export const findOutPaidUser = (
  isGroupPaid: boolean,
  singlePlanExpenses: Expense[],
  userId: string
): string => {
  const paidUserArray = makePaidUserArray(singlePlanExpenses);
  if (isGroupPaid) {
    console.log(isGroupPaid, singlePlanExpenses, userId, paidUserArray[0]);
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

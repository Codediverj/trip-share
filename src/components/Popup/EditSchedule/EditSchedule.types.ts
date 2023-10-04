export type SinglePlan = {
  singlePlanId: string;
  planId: string;
  placeFromId: string;
  placeFromName: string;
  placeToId?: string;
  placeToName?: string;
  note?: string;
  links?: string;
  updatedAt: Date;
  updatedBy: string;
  isGroupActivity: boolean;
  expense: number;
  paidID: string;
};

export type Expense = {
  expense: number;
  expenseId: number;
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

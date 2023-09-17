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

  // Single_Plan_Expense: {
  //   expenseId: string;
  //   singlePlanId: string;
  //   groupPayment: boolean;
  //   expense: number;
  //   attended_user_id: string; //각각의 유저 데이터
  //   paidUserId: string; // 각각의 유저 데이터
  // }[];
};

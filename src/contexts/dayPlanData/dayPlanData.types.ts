export type DayPlanDataStore = {
  singlePlanId: string;
  planId: string;
  date: Date;
  order: number;
  placeFromId: string;
  placeFromName: string;
  placeToId?: string;
  placeToName?: string;
  note?: string;
  links?: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;

  Single_Plan_Expense: {
    expenseId: string;
    groupPayment: boolean;
    expense: number;
    attendedUser?: {
      attendedUserId: string;
      attendedUserNickname: string;
      attendedUserImage: string;
    }[];
    paidUser?: {
      paidUserId: string;
      paidUserrNickname: string;
      paidUserUserImage: string;
    }[];
  }[];
};

export const initDayPlanDataStore = (): DayPlanDataStore => {
  return {
    singlePlanId: "",
    planId: "",
    date: new Date(),
    order: 0,
    placeFromId: "",
    placeFromName: "",
    placeToId: "",
    placeToName: "",
    note: "",
    links: "",
    createdAt: new Date(),
    createdBy: "",
    updatedAt: new Date(),
    updatedBy: "",

    Single_Plan_Expense: [],
  };
};

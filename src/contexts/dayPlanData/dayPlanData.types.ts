export type DayPlanDataStore = {
  singlePlanId: string;
  planId: string;
  date: Date;
  order: number;
  lastCheckTime?: Date;
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
  isGroupActivity: boolean;

  Single_Plan_Expense: {
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
  }[];
}[];

export const initDayPlanDataStore = (): DayPlanDataStore => {
  return [];
};

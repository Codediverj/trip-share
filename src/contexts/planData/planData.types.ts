export type PlanDataStore = {
  planId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  backgroundImage?: string;
  currency: string;

  peopleJoin: {
    userId: string;
    nickname?: string;
    profileImage?: string;
    email?: string;
    travelerCode: string;
  }[];

  // People_Join: {
  //   User: {
  //     userId: string;
  //     nickname: string;
  //     profileImage: string;
  //     createdAt: Date;
  //     email: string;
  //     travelerCode: string;
  //   }[];
  //   planId: string;
  //   userId: string;
  // }[];
};

export const initPlanDataStore = (): PlanDataStore => {
  return {
    planId: "",
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    backgroundImage: "",
    currency: "",
    peopleJoin: [],
  };
};

export type PlanDataStore = {
  planId: string;
  title: string;
  startDate: Date;
  endDate: Date;
  backgroundImage?: string;
  currency: string;
  People_Join: {
    user: {
      userId: string;
      nickname: string;
      profileImage: string;
      createdAt: Date;
      email: string;
      travelerCode: string;
    };
    planId: string;
    userId: string;
  }[];
};

export const initPlanDataStore = (): PlanDataStore => {
  return {
    planId: "",
    title: "",
    startDate: new Date(),
    endDate: new Date(),
    backgroundImage: "",
    currency: "",
    People_Join: [
      {
        user: {
          userId: "",
          nickname: "",
          profileImage: "/profile_default_image.svg",
          createdAt: new Date(),
          email: "",
          travelerCode: "",
        },
        planId: "",
        userId: "",
      },
    ],
  };
};

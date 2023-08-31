export type DayPlanDataStore = { singlePlanId: string }; // list of single plans

export const initDayPlanDataStore = (): DayPlanDataStore => ({ singlePlanId: "" });

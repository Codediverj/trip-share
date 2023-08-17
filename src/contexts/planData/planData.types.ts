export type PlanDataStore = {
  sample: string;  
};

export type PlanDataAction =
  | { type: "clearStore" }
  | { type: "setStore"; value: { str: string } };

export const initPlanDataStore = (): PlanDataStore => {
  return { sample: 'sample'};
};
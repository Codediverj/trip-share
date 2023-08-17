import { PlanDataAction, PlanDataStore } from "./planData.types";

type PlanDataReducer = (state: PlanDataStore, action: PlanDataAction) => PlanDataStore;

export const planDataReducer: PlanDataReducer = (state, action) => {
  switch (action.type) {
    case "clearStore": {
      return { sample: "" };
    }
    case "setStore": {
      const { str } = action.value;
      return { sample: str };
    }
    default: {
      throw new Error(
        // @ts-ignore
        `${action.type} is not a valid action for the planData context`
      );
    }
  }

  return state; // return state without changing to prevent re-rendering
};
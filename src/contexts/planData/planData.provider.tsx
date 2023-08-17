"use client";
import { createContext, Dispatch, FC, PropsWithChildren, useContext, useReducer } from "react";
import { initPlanDataStore, PlanDataAction, PlanDataStore } from "./planData.types";
import { planDataReducer } from "./planData.reducer";

const PlanDataActionContext = createContext<Dispatch<PlanDataAction> | undefined>(undefined);
PlanDataActionContext.displayName = "PlanDataActionContext";
const PlanDataStoreContext = createContext<PlanDataStore | undefined>(undefined);
PlanDataStoreContext.displayName = "PlanDataStoreContext";

export const usePlanDataAction = (): Dispatch<PlanDataAction> => {
  const context = useContext(PlanDataActionContext);
  if (!context) {
    throw new Error("usePlanDataAction must be used within a PlanDataProvider");
  }
  return context;
};

export const usePlanDataStore = (): PlanDataStore => {
  const context = useContext(PlanDataStoreContext);
  if (!context) {
    throw new Error("usePlanDataStore must be used within a PlanDataProvider");
  }
  return context;
};

export const PlanDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, action] = useReducer(planDataReducer, null, initPlanDataStore);

  return (
    <PlanDataActionContext.Provider value={action}>
      <PlanDataStoreContext.Provider value={state}>{children}</PlanDataStoreContext.Provider>
    </PlanDataActionContext.Provider>
  );
};
PlanDataProvider.displayName = "PlanDataProvider";

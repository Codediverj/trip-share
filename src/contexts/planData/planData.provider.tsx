"use client";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";
import { initPlanDataStore, PlanDataStore } from "./planData.types";
import { getAllPlanDetail } from "@/app/api/plan/plan.apis";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const PlanDataStoreContext = createContext<PlanDataStore | undefined>(undefined);
PlanDataStoreContext.displayName = "PlanDataStoreContext";

export const usePlanDataStore = (): PlanDataStore => {
  const context = useContext(PlanDataStoreContext);
  if (!context) {
    throw new Error("usePlanDataStore must be used within a PlanDataProvider");
  }
  return context;
};

export const PlanDataProvider: FC<PropsWithChildren<{ planId: string }>> = ({
  children,
  planId,
}) => {
  const [data, setData] = useState<PlanDataStore>(initPlanDataStore);
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        return getAllPlanDetail(supabase, planId).then((planData) => {
          setData(planData);
        });
      }
    });
  }, [supabase, supabase.auth, planId]);

  return <PlanDataStoreContext.Provider value={data}>{children}</PlanDataStoreContext.Provider>;
};
PlanDataProvider.displayName = "PlanDataProvider";

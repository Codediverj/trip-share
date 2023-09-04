"use client";
import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { usePlanDataStore } from "../planData/planData.provider";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DateTime } from "luxon";
import { subscribeToChannel } from "@/utils/supabaseRealtime.utils";
import { DayPlanDataStore, initDayPlanDataStore } from "./dayPlanData.types";
import { Database } from "@/supabase.types";
import { getSinglePlanForDate } from "@/app/api/(single_plan)/dayplansingle.apis";

const DayPlanDataContext = createContext<((index: number) => void) | undefined>(undefined);
DayPlanDataContext.displayName = "DayPlanDataContext";
const DayPlanDataStoreContext = createContext<DayPlanDataStore | undefined>(undefined);
DayPlanDataStoreContext.displayName = "DayPlanDataStoreContext";

export const useDayPlanData = (): ((index: number) => void) => {
  const context = useContext(DayPlanDataContext);
  if (!context) {
    throw new Error("useDayPlanData must be used within a DayPlanDataProvider");
  }
  return context;
};

export const useDayPlanDataStore = (): DayPlanDataStore => {
  const context = useContext(DayPlanDataStoreContext);
  if (!context) {
    throw new Error("useDayPlanDataStore must be used within a DayPlanDataProvider");
  }
  return context;
};

export const DayPlanDataProvider: FC<PropsWithChildren> = ({ children }) => {
  const supabase = createClientComponentClient<Database>();
  const { planId, startDate } = usePlanDataStore();
  const [selectedDate, setSelectedDate] = useState<DateTime>();
  const [dayPlans, setDayPlans] = useState<DayPlanDataStore>(initDayPlanDataStore());

  useEffect(() => {
    if (!planId || !startDate) return;

    setSelectedDate(DateTime.fromJSDate(startDate));
  }, [planId, startDate]);

  useEffect(() => {
    if (!selectedDate) return;
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        return getSinglePlanForDate(supabase, planId, selectedDate).then((planData) => {
          setDayPlans(planData);
        });
      }
    });

    const channel = subscribeToChannel(supabase, (payload) => {
      getSinglePlanForDate(supabase, planId, selectedDate).then(setDayPlans).catch(console.error);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [planId, selectedDate, startDate, supabase]);

  const changeDate = useCallback(
    (index: number) => {
      setSelectedDate(DateTime.fromJSDate(startDate).plus({ days: index }));
    },
    [startDate]
  );

  return (
    <DayPlanDataContext.Provider value={changeDate}>
      <DayPlanDataStoreContext.Provider value={dayPlans}>
        {children}
      </DayPlanDataStoreContext.Provider>
    </DayPlanDataContext.Provider>
  );
};
DayPlanDataProvider.displayName = "DayPlanDataProvider";

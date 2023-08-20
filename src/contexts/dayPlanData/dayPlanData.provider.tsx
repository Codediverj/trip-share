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
import { DayPlanDataStore } from "./dayPlanData.types";

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
  const supabase = createClientComponentClient();
  const { planId, startDate } = usePlanDataStore();
  const [selectedDate, setSelectedDate] = useState<DateTime>();
  const [dayPlans, setDayPlans] = useState<DayPlanDataStore>();

  useEffect(() => {
    if (!planId || !startDate) return;

    setSelectedDate(DateTime.fromJSDate(startDate));
  }, [planId, startDate]);

  useEffect(() => {
    if (!selectedDate) return;

    const getSinglePlanForDate = async () => {
      const { data } = await supabase
        .from("Single_Plan")
        .select("single_plan_id")
        .match({ plan_id: planId, date: selectedDate.toFormat("yyyy-MM-dd") });

      setDayPlans(data?.[0].single_plan_id);
    };

    getSinglePlanForDate();

    const channel = subscribeToChannel(supabase, () => {
      getSinglePlanForDate();
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

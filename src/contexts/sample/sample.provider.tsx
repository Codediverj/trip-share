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
import { subscribeToChannel } from "@/app/utils/supabaseRealtime.utils";
import { SampleStore } from "./sample.types";

const SampleActionContext = createContext<((index: number) => void) | undefined>(undefined);
SampleActionContext.displayName = "SampleActionContext";
const SampleStoreContext = createContext<SampleStore | undefined>(undefined);
SampleStoreContext.displayName = "SampleStoreContext";

export const useSampleAction = (): ((index: number) => void) => {
  const context = useContext(SampleActionContext);
  if (!context) {
    throw new Error("useSampleAction must be used within a SampleProvider");
  }
  return context;
};

export const useSampleStore = (): SampleStore => {
  const context = useContext(SampleStoreContext);
  if (!context) {
    throw new Error("useSampleStore must be used within a SampleProvider");
  }
  return context;
};

export const SampleProvider: FC<PropsWithChildren> = ({ children }) => {
  const supabase = createClientComponentClient();
  const { planId, startDate } = usePlanDataStore();
  const [selectedDate, setSelectedDate] = useState<DateTime>();
  const [dayPlans, setDayPlans] = useState<SampleStore>();

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
    <SampleActionContext.Provider value={changeDate}>
      <SampleStoreContext.Provider value={dayPlans}>{children}</SampleStoreContext.Provider>
    </SampleActionContext.Provider>
  );
};
SampleProvider.displayName = "SampleProvider";

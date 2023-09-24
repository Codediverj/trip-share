"use client";
import { createContext, FC, PropsWithChildren, useContext, useState, useEffect } from "react";
import { initExpenseDataStore, ExpenseDataStore } from "./expenseData.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { subscribeToChannel } from "@/utils/supabaseRealtime.utils";
import { getExpenseData } from "@/app/api/expense/expense.apis";

const ExpenseDataStoreContext = createContext<ExpenseDataStore | undefined>(undefined);
ExpenseDataStoreContext.displayName = "ExpenseDataStoreContext";

export const useExpenseDataStore = (): ExpenseDataStore => {
  const context = useContext(ExpenseDataStoreContext);
  if (!context) {
    throw new Error("useExpenseDataStore must be used within a ExpenseDataProvider");
  }
  return context;
};

export const ExpenseDataProvider: FC<PropsWithChildren<{ planId: string }>> = ({
  children,
  planId,
}) => {
  const [data, setData] = useState<ExpenseDataStore>(initExpenseDataStore);
  const supabase = createClientComponentClient();


  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        return getExpenseData(supabase, planId).then((planData) => {
          setData(planData);
        });
      }
    });

    const channel = subscribeToChannel(supabase, (payload) => {
      getExpenseData(supabase, planId).then(setData).catch(console.error);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, supabase.auth, planId]);


  return (
      <ExpenseDataStoreContext.Provider value={data}>
        {children}
      </ExpenseDataStoreContext.Provider>
  );
};
ExpenseDataProvider.displayName = "ExpenseDataProvider";
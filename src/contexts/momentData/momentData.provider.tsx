"use client";
import { createContext, FC, PropsWithChildren, useContext, useEffect, useState } from "react";
import { initMomentDataStore, MomentDataStore } from "./momentData.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { subscribeToChannel } from "@/utils/supabaseRealtime.utils";
import { getMomentData } from "@/app/api/moment/moment.apis";

const MomentDataStoreContext = createContext<MomentDataStore | undefined>(undefined);
MomentDataStoreContext.displayName = "MomentDataStoreContext";

export const useMomentDataStore = (): MomentDataStore => {
  const context = useContext(MomentDataStoreContext);
  if (!context) {
    throw new Error("useMomentDataStore must be used within a MomentDataProvider");
  }
  return context;
};

export const MomentDataProvider: FC<PropsWithChildren<{ planId: string }>> = ({
  children,
  planId,
}) => {
  const [data, setData] = useState<MomentDataStore>(initMomentDataStore);
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        return getMomentData(supabase, planId).then((momentData) => {
          setData(momentData);
        });
      }
    });

    const channel = subscribeToChannel(supabase, (payload) => {
      getMomentData(supabase, planId).then(setData).catch(console.error);
    });

    return () => {
      channel.unsubscribe();
    };
  }, [supabase, supabase.auth, planId]);
  return <MomentDataStoreContext.Provider value={data}>{children}</MomentDataStoreContext.Provider>;
};
MomentDataProvider.displayName = "MomentDataProvider";

"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserDataStore, initUserDataStore } from "./userData.types";
import { getUser } from "@/app/api/user/user.apis";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getAllPlanDetail } from "@/app/api/plan/plan.apis";

const UserDataStoreContext = createContext<UserDataStore | undefined>(undefined);
UserDataStoreContext.displayName = "UserDataStoreContext";

export const useUserDataStore = (): UserDataStore => {
  const context = useContext(UserDataStoreContext);
  if (!context) {
    throw new Error("useUserDataStore must be used within a UserDataProvider");
  }
  return context;
};

export const UserDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<UserDataStore>(initUserDataStore);
  const supabase = createClientComponentClient();

  useEffect(() => {
    getAllPlanDetail(supabase, "bccb6ee7-d9c3-4204-8495-09da343ef96a");

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        return getUser(supabase, user.id).then((userData) => {
          setData(userData);
        });
      }
    });
  }, [supabase, supabase.auth]);

  return <UserDataStoreContext.Provider value={data}>{children}</UserDataStoreContext.Provider>;
};
UserDataProvider.displayName = "UserDataProvider";

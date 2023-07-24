"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserDataStore } from "./userData.types";
import { getUser } from "@/app/api/user/user.apis";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
  const [data, setData] = useState<UserDataStore | undefined>(undefined);
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getUser();
    getUser(supabase).then((userData) => {
      //console.log(userData);
      setData(userData);
    });
  }, [supabase, supabase.auth]);

  return <UserDataStoreContext.Provider value={data}>{children}</UserDataStoreContext.Provider>;
};
UserDataProvider.displayName = "UserDataProvider";

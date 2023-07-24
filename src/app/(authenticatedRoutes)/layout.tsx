import { ReactNode } from "react";
import { UserDataProvider } from "@/contexts/userData/userData.provider";

const AuthenticatedLayout = ({ children }: { children: ReactNode }) => {
  return <UserDataProvider>{children}</UserDataProvider>;
};

export default AuthenticatedLayout;

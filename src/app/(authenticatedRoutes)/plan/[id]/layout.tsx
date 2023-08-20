import { ReactNode } from "react";
import { PlanDataProvider } from "@/contexts/planData/planData.provider";

const AuthenticatedLayout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { id: string };
}) => {
  const planId = params.id;
  return <PlanDataProvider planId={planId}>{children}</PlanDataProvider>;
};

export default AuthenticatedLayout;

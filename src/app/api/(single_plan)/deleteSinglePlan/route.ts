import { Database } from "@/supabase.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const body = await request.json();
  //console.log(body);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const {
    data: singlePlanExpenseDelete,
    error: singlePlanExpenseError,
    status: singlePlanExpenseStatus,
  } = await supabase
    .from("Single_Plan_Expense")
    .delete()
    .eq("single_plan_id", body.singlePlanId)
    .select();
  if (singlePlanExpenseError)
    return NextResponse.json(singlePlanExpenseError, { status: singlePlanExpenseStatus });

  const {
    data: singlePlanDelete,
    error: singlePlanDeleteError,
    status: singlePlanDeleteStatus,
  } = await supabase
    .from("Single_Plan")
    .delete()
    .eq("single_plan_id", body.singlePlanId)
    .select()
    .single();
  if (singlePlanDeleteError)
    return NextResponse.json(singlePlanDeleteError, { status: singlePlanDeleteStatus });

  return NextResponse.json({ good: true });
}

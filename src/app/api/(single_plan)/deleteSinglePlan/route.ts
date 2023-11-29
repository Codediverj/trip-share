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
    data: checkOrderUpdateList,
    error: checkOrderUpdateListError,
    status: checkOrderUpdateListStatus,
  } = await supabase
    .from("Single_Plan")
    .select()
    .eq("plan_id", body.planId)
    .eq("date", body.date)
    .neq("single_plan_id", body.singlePlanId)
    .order("order");

  if (checkOrderUpdateListError) {
    return NextResponse.json(checkOrderUpdateListError, { status: checkOrderUpdateListStatus });
  }

  //Delete Plan Expense
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
  //Delete Plan
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

  const orderUpdateList = checkOrderUpdateList.map((list) => ({
    ...list,
    order: list.order > body.order ? list.order - 1 : list.order,
    updated_at: new Date().toISOString(),
    updated_by: user.id,
  }));

  const { error: updateSinglePlanOrderError, status: updateSinglePlanOrderStatus } = await supabase
    .from("Single_Plan")
    .upsert(orderUpdateList);

  if (updateSinglePlanOrderError)
    return NextResponse.json(updateSinglePlanOrderError, { status: updateSinglePlanOrderStatus });

  return NextResponse.json({ good: true });
}

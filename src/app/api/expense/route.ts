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
    data: joinUsers,
    error: joinUserError,
    status: joinUserStatus,
  } = await supabase.from("People_Join").select("user_id").eq("plan_id", body.planId);
  if (joinUserError) return NextResponse.json(joinUserError, { status: joinUserStatus });

  const joined = joinUsers.map((user) => user.user_id);

  const expenseList = joined.map((userId) => ({
    single_plan_id: body.single_plan_id,
    expense: body.isGroupActivity ? body.expense / joined.length : body.expense,
    attended_user_id: userId,
    paid_user_id: body.isGroupActivity ? body.paidID : userId === body.paidID ? body.paidID : null,
  }));

  await supabase.from("Single_Plan_Expense").delete().eq("single_plan_id", body.singlePlanId);

  const { error: singlePlanExpenseError, status: singlePlanExpenseStatus } = await supabase
    .from("Single_Plan_Expense")
    .insert(expenseList);

  if (singlePlanExpenseError)
    return NextResponse.json(singlePlanExpenseError, { status: singlePlanExpenseStatus });

  return NextResponse.json({ good: true });
}

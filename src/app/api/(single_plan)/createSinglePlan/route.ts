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
    data: singlePlanCreated,
    error: singlePlanCreateError,
    status: singlePlanCreateStatus,
  } = await supabase
    .from("Single_Plan")
    .insert({
      plan_id: body.planId,
      date: body.date,
      order: body.order,
      place_from_id: body.placeFromId,
      place_from_name: body.placeFromName,
      place_to_id: body.placeToId || undefined,
      place_to_name: body.placeToName || undefined,
      note: body.note || undefined,
      links: body.links || undefined,
      created_at: body.createdAt,
      created_by: user.id,
      updated_at: body.updatedAt,
      updated_by: user.id,
      is_group_activity: body.isGroupActivity,
    })
    .select()
    .single();
  if (singlePlanCreateError)
    return NextResponse.json(singlePlanCreateError, { status: singlePlanCreateStatus });

  const {
    data: joinUsers,
    error: joinUserError,
    status: joinUserStatus,
  } = await supabase.from("People_Join").select("user_id").eq("plan_id", body.planId);
  if (joinUserError) return NextResponse.json(joinUserError, { status: joinUserStatus });

  const joined = joinUsers.map((user) => user.user_id);

  const expenseList = joined.map((userId) => ({
    single_plan_id: singlePlanCreated.single_plan_id,
    expense: body.isGroupActivity ? body.expense / joined.length : body.expense,
    attended_user_id: userId,
    paid_user_id: body.isGroupActivity ? body.paidID : userId === body.paidID ? body.paidID : null,
  }));

  const {
    data: singlePlanExpenseCreated,
    error: singlePlanExpenseError,
    status: singlePlanExpenseStatus,
  } = await supabase.from("Single_Plan_Expense").insert(expenseList).select();
  if (singlePlanExpenseError)
    return NextResponse.json(singlePlanCreateError, { status: singlePlanExpenseStatus });

  return NextResponse.json({ good: true });
}

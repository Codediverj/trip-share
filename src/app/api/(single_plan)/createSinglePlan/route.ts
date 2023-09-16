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
      created_at: body.created_at,
      created_by: user.id,
      updated_at: body.updated_at,
      updated_by: user.id,
      is_group_activity: body.IsGroupActivity,
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

  console.log(joinUsers);
  console.log(singlePlanCreated);

  // joined = ["1", "2", "3"] // user Ids

  // const expenseList = joined.map(userId => ({
  //    expends: body.expense / joined.length
  //    attended_user_id: userId,
  //
  // }))

  // await supabase.from("Single_Plan_Expense").insert(expenseList)

  // return supabase.from("Single_Plan_Expense").insert({
  //   expense: body.expense,
  //   attended_user_id: user?.id,
  //   paid_user_id: ,
  // });

  return NextResponse.json(singlePlanCreated);
}

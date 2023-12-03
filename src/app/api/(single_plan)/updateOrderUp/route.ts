import { Database } from "@/supabase.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const body = await request.json();
  console.log(body);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const {
    data: updateOrderUplist,
    error: updateOrderUplistError,
    status: updateOrderUplistStatus,
  } = await supabase
    .from("Single_Plan")
    .select()
    .eq("plan_id", body.planId)
    .eq("date", body.date)
    .order("order");

  if (updateOrderUplistError) {
    return NextResponse.json(updateOrderUplistError, { status: updateOrderUplistStatus });
  }

  const filteredList = updateOrderUplist.filter((list) => {
    return list.order === body.order || list.order === body.order - 1;
  });

  const orderNumSwitchList = filteredList.map((list) => {
    if (list.order === body.order - 1) {
      return {
        ...list,
        order: list.order + 1,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      };
    } else if (list.order === body.order) {
      return {
        ...list,
        order: list.order - 1,
        updated_at: new Date().toISOString(),
        updated_by: user.id,
      };
    }
  });

  console.log(orderNumSwitchList);

  // const { error: updateOrderNumberError, status: updateOrderNumberStatus } = await supabase
  //   .from("Single_Plan")
  //   .upsert(orderNumSwitchList);

  // if (updateOrderNumberError)
  //   return NextResponse.json(updateOrderNumberError, { status: updateOrderNumberStatus });

  return NextResponse.json({ good: true });
}

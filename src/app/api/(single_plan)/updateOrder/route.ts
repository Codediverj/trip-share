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

  const { error: updateOrderNumberError, status: updateOrderNumberStatus } = await supabase.rpc(
    "swap_single_plan_order",
    {
      to_order: body.order,
      from_order: body.order + body.position,
      plan_id: body.planId,
      plan_date: body.date,
    }
  );

  if (updateOrderNumberError)
    return NextResponse.json(updateOrderNumberError, { status: updateOrderNumberStatus });

  return NextResponse.json({ good: true });
}

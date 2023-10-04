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

  const { error: paidBackExpenseError, status: paidBackExpenseStatus } = await supabase
    .from("Single_Plan_Expense")
    .update({ is_paid_back: true })
    .match({ paid_user_id: body.paidUserId, attended_user_id: user.id });

  if (paidBackExpenseError)
    return NextResponse.json(paidBackExpenseError, { status: paidBackExpenseStatus });

  return NextResponse.json({ good: true });
}

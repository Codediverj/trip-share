import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await request.json();

  const { data: deletedRows, error } = await supabase
    .from("People_Join")
    .delete()
    .eq("plan_id", body.planId)
    .eq("user_id", body.userId);

  if (error) {
    console.error(error);
  }

  return NextResponse.json(deletedRows);
}

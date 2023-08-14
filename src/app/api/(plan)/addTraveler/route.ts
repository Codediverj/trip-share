import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const body = await request.json();

  const { data: addTraveler, error } = await supabase
    .from("People_Join")
    .insert({
      plan_id: body.planId,
      user_id: body.userId,
    })
    .select()
    .single();

  if (error) {
    console.error(error);
  }

  return NextResponse.json(addTraveler);
}

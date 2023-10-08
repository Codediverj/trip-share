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

  const { error: momentCreateError, status: momentCreateStatus } = await supabase
    .from("Moment")
    .insert({
      plan_id: body.planId,
      title: body.title,
      moment_date: body.momentDate,
      memo: body.memo,
      moment_image: body.momentImage || undefined,
      writer: user.id,
    })
    .select()
    .single();
  if (momentCreateError)
    return NextResponse.json(momentCreateError, { status: momentCreateStatus });

  return NextResponse.json({ good: true });
}

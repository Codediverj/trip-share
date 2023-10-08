import { Database } from "@/supabase.types";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const body = await request.json();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  const { error: momentUpdateError, status: momentUpdateStatus } = await supabase
    .from("Moment")
    .update({
      title: body.title,
      moment_date: body.momentDate,
      memo: body.memo,
      moment_image: body.momentImage || undefined,
    })
    .eq("id", body.id)
    .select()
    .single();
  if (momentUpdateError)
    return NextResponse.json(momentUpdateError, { status: momentUpdateStatus });

  return NextResponse.json({ good: true });
}

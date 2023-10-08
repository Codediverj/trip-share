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

  const { error: momentDeleteError, status: momentDeleteStatus } = await supabase
    .from("Moment")
    .delete()
    .eq("id", body.id)
    .select();
  if (momentDeleteError)
    return NextResponse.json(momentDeleteError, { status: momentDeleteStatus });

  return NextResponse.json({ good: true });
}

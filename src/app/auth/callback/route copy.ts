import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  console.log("code", code);
  if (code) {
    const {
      data: { user },
    } = await supabase.auth.exchangeCodeForSession(code);
    // const response = await supabase.auth.exchangeCodeForSession(code);
    // const data = response.data;
    // const user = data.user;

    const { data: existUser } = await supabase
      .from("user")
      .select("*")
      .eq("user_id", user?.id)
      .single();
    // const response = await supabase.from("user").select("*").eq("user_id", user?.id).single();
    // const data = response.data;

    if (existUser) {
      // sign in
    } else {
      // sign up
      //
    }
  }

  return NextResponse.redirect(new URL("/", req.url));
}

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//Component
import GeneratedTravlerCode from "@/components/GenerateTravelerCode";
import ExtractUsernameFromEmail from "@/components/ExtractUsernameFromEmail";

export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (code) {
    const {
      data: { user },
    } = await supabase.auth.exchangeCodeForSession(code);

    supabase
      .from("User")
      .insert({
        user_id: user?.id,
        created_at: new Date(),
        profile_image: "/profile_default_image.svg",
        nickname: ExtractUsernameFromEmail(user?.email || ""),
        email: user?.email,
        traveler_code: GeneratedTravlerCode(),
      })
      .select()
      .single()
      .then(({ data, error }) => {
        console.log(data);
        if (error) {
          console.log(error);
        }
      });

    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.redirect(new URL("/auth/login", req.url));
}

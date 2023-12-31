import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

//Component
import GeneratedTravlerCode from "@/components/GenerateTravelerCode";
import ExtractUsernameFromEmail from "@/components/ExtractUsernameFromEmail";

//magin-link로 로그인 햇을때 필요한 부분. 현재는 사용하지 않게 됨.(이메일 로그인)
export async function GET(req: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
    return NextResponse.redirect(new URL("/auth/reset-password", req.url));
  }

  // console.log("code", code);
  // if (code) {
  //   const {
  //     data: { session },
  //   } = await supabase.auth.getSession();
  //   if (session) {
  //     await supabase.auth.signOut();
  //   }

  //   const {
  //     data: { user },
  //   } = await supabase.auth.exchangeCodeForSession(code);
  //   // const response = await supabase.auth.exchangeCodeForSession(code);
  //   // const data = response.data;
  //   // const user = data.user;

  //   const { data: existUser } = await supabase
  //     .from("user")
  //     .select("*")
  //     .eq("user_id", user?.id)
  //     .single();
  //   // const response = await supabase.from("user").select("*").eq("user_id", user?.id).single();
  //   // const data = response.data;

  //   if (existUser) {
  //     // sign in
  //     console.log("User already exists:", user);
  //   } else {
  //     // sign up
  //     console.log(user);
  //     supabase
  //       .from("User")
  //       .insert({
  //         user_id: user?.id,
  //         created_at: new Date(),
  //         profile_image: "/profile_default_image.svg",
  //         nickname: ExtractUsernameFromEmail(user?.email || ""),
  //         email: user?.email,
  //         traveler_code: GeneratedTravlerCode(),
  //       })
  //       .select()
  //       .single()
  //       .then(({ data, error }) => {
  //         console.log(data);
  //         if (error) {
  //           console.log(error);
  //         }
  //       });
  //   }
  // }

  return NextResponse.redirect(new URL("/home", req.url));
}

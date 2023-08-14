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

  //+ 만약 로그인된 userId와 리스트에서 삭제된 userID가 같은 사람일 경우
  // 삭제후 /home으로 리다이렉트 해야 할듯...
  return NextResponse.json(deletedRows);
}

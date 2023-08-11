import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { UpdatePlanRequest, UpdatePlanResponse } from "./types";
import { DateTime } from "luxon";

export async function POST(request: NextRequest) {
  const supabase = createRouteHandlerClient({ cookies });

  const body: UpdatePlanRequest = await request.json();
  console.log(body);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("Plan")
    .upsert({
      title: body.title,
      start_date: body.startDate,
      end_date: body.endDate,
      background_image: body.backgroundImage,
      currency: body.currency,
      plan_id: body.planId,
    })
    .select()
    .single();

  return NextResponse.json<UpdatePlanResponse>({
    planId: data.plan_id,
    title: data.title,
    startDate: DateTime.fromISO(data.start_date).toJSDate(),
    endDate: DateTime.fromISO(data.end_date).toJSDate(),
    backgroundImage: data.background_image || undefined,
    currency: data.currency,
  });
}

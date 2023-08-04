import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const body = await request.json();
  console.log(body);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (body.planId) {
    // When planId exists, perform upsert
    supabase
      .from("Plan")
      .upsert({
        title: body.title,
        start_date: body.startDate,
        end_date: body.endDate,
        background_image: body.backgroundImage,
        currency: body.currency || undefined,
        plan_id: body.planId, // Assuming planId is the primary key
      })
      .then(({ data: upsertData, error: upsertError }) => {
        if (upsertError) {
          console.log(upsertError);
        }
      });
  } else {
    // When planId doesn't exist, perform insert
    supabase
      .from("Plan")
      .insert({
        title: body.title,
        start_date: body.startDate,
        end_date: body.endDate,
        background_image: body.backgroundImage,
        currency: body.currency || undefined,
      })
      .select()
      .single()
      .then(({ data, error }) => {
        console.log(data);
        if (error) {
          console.log(error);
        }
        if (data) {
          return supabase.from("People_Join").insert({
            plan_id: data.plan_id,
            user_id: user?.id,
          });
        }
      });
  }

  return NextResponse.json({ good: true });
}

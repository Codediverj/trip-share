import { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import { Database } from "@/supabase.types";
import { DayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.types";

export const getSinglePlanForDate = async (
  supabase: SupabaseClient<Database>,
  planId: string,
  selectedDate: DateTime
): Promise<DayPlanDataStore> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("Single_Plan")
    .select(
      "*, Single_Plan_Expense(*, attend:User!Single_Plan_Expense_attended_user_id_fkey(*),paid:User!Single_Plan_Expense_paid_user_id_fkey(*)), updateCheckTime:UpdateCheck(check_time)"
    )
    .eq("updateCheckTime.user_id", user!.id)
    .match({ plan_id: planId, date: selectedDate.toFormat("yyyy-MM-dd") })
    .order("order", { ascending: true });
  if (error) throw error;

  return data.map((singlePlan) => ({
    singlePlanId: singlePlan.single_plan_id,
    planId: singlePlan.plan_id,
    date: DateTime.fromISO(singlePlan.date).toJSDate(),
    order: singlePlan.order,
    lastCheckTime: singlePlan.updateCheckTime[0]
      ? DateTime.fromISO(singlePlan.updateCheckTime[0].check_time).toJSDate()
      : undefined,
    placeFromId: singlePlan.place_from_id,
    placeFromName: singlePlan.place_from_name,
    placeToId: singlePlan.place_to_id || undefined,
    placeToName: singlePlan.place_to_name || undefined,
    note: singlePlan.note || undefined,
    links: singlePlan.links || undefined,
    createdAt: DateTime.fromISO(singlePlan.created_at).toJSDate(),
    createdBy: singlePlan.created_by,
    updatedAt: DateTime.fromISO(singlePlan.updated_at).toJSDate(),
    updatedBy: singlePlan.updated_by,
    isGroupActivity: singlePlan.is_group_activity,

    Single_Plan_Expense: singlePlan.Single_Plan_Expense.map((expense) => ({
      expenseId: expense.expense_id,
      expense: expense.expense,
      attendedUser: {
        attendedUserId: expense.attend!.user_id,
        attendedUserNickname: expense.attend!.nickname || undefined,
        attendedUserImage: expense.attend!.profile_image || undefined,
      },
      paidUser: expense.paid
        ? {
            paidUserId: expense.paid.user_id,
            paidUserrNickname: expense.paid.nickname || undefined,
            paidUserUserImage: expense.paid.profile_image || undefined,
          }
        : undefined,
    })),
  }));
};

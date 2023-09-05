import { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import { Database } from "@/supabase.types";
import { DayPlanDataStore } from "@/contexts/dayPlanData/dayPlanData.types";

export const getSinglePlanForDate = async (
  supabase: SupabaseClient<Database>,
  planId: string,
  selectedDate: DateTime
): Promise<DayPlanDataStore> => {
  const { data, error } = await supabase
    .from("Single_Plan")
    .select(
      "*, Single_Plan_Expense(*, attend:User!Single_Plan_Expense_attended_user_id_fkey(*),paid:User!Single_Plan_Expense_paid_user_id_fkey(*))"
    )
    .match({ plan_id: planId, date: selectedDate.toFormat("yyyy-MM-dd") });
  if (error) throw error;
  console.log(data);
  if (data && data.length > 0) {
    return data.map((singlePlan) => ({
      singlePlanId: singlePlan.single_plan_id,
      planId: singlePlan.plan_id,
      date: DateTime.fromISO(singlePlan.date).toJSDate(),
      order: singlePlan.order,
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

      Single_Plan_Expense: singlePlan.Single_Plan_Expense.map((expense) => ({
        expenseId: expense.expense_id,
        groupPayment: expense.group_payment,
        expense: expense.expense,
      })),
    }));
  }
};

// Single_Plan_Expense: {

//   attendedUser?: {
//     attendedUserId: string;
//     attendedUserNickname: string;
//     attendedUserImage: string;
//   }[];
//   paidUser?: {
//     paidUserId: string;
//     paidUserrNickname: string;
//     paidUserUserImage: string;
//   }[];
// }[];

import { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import { Database } from "@/supabase.types";
import { ExpenseDataStore } from "@/contexts/expenseData/expenseData.types";

export const getExpenseData = async (
  supabase: SupabaseClient<Database>,
  planId: string
): Promise<ExpenseDataStore> => {
  const { data, error } = await supabase
    .from("Single_Plan")
    .select(
      "*, Single_Plan_Expense(*, attend:User!Single_Plan_Expense_attended_user_id_fkey(*),paid:User!Single_Plan_Expense_paid_user_id_fkey(*))"
    )
    .match({ plan_id: planId })
    .order("order", { ascending: true });
  if (error) throw error;

  return data.map((expenseData) => ({
    singlePlanId: expenseData.single_plan_id,
    planId: expenseData.plan_id,
    date: DateTime.fromISO(expenseData.date).toJSDate(),
    order: expenseData.order,
    placeFromId: expenseData.place_from_id,
    placeFromName: expenseData.place_from_name,
    placeToId: expenseData.place_to_id || undefined,
    placeToName: expenseData.place_to_name || undefined,
    note: expenseData.note || undefined,
    links: expenseData.links || undefined,
    createdAt: DateTime.fromISO(expenseData.created_at).toJSDate(),
    createdBy: expenseData.created_by,
    updatedAt: DateTime.fromISO(expenseData.updated_at).toJSDate(),
    updatedBy: expenseData.updated_by,
    isGroupActivity: expenseData.is_group_activity,

    Single_Plan_Expense: expenseData.Single_Plan_Expense.map((expense) => ({
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

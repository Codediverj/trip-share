import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/supabase.types";
import { planFriends } from "./planFriends.types";

export const getMyPlanIds = async (supabase: SupabaseClient<Database>, userId: string) => {
  const { data, error } = await supabase
    .from("People_Join")
    .select("plan_id")
    .eq("user_id", userId);

  if (error) {
    console.error("Error fetching plan_ids:", error.message);
    return [];
  }
  const planIds = data.map((row) => row.plan_id);
  return planIds;
};

export const getOtherUserIds = async (
  supabase: SupabaseClient<Database>,
  planIds: string[],
  userId: string
): Promise<planFriends> => {
  const { data, error } = await supabase
    .from("People_Join")
    .select("user_id, User(*)")
    .in("plan_id", planIds);

  if (error) {
    console.error("Error fetching other user_ids:", error.message);
    return [];
  }

  const otherUserIds = data.filter((row) => row.user_id !== userId);

  return otherUserIds;
};

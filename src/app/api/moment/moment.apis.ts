import { SupabaseClient } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import { Database } from "@/supabase.types";
import { MomentDataStore } from "@/contexts/momentData/momentData.types";

export const getMomentData = async (
  supabase: SupabaseClient<Database>,
  planId: string
): Promise<MomentDataStore> => {
  const { data, error } = await supabase
    .from("Moment")
    .select("*, User(*)")
    .match({ plan_id: planId })
    .order("moment_date", { ascending: true });
  if (error) throw error;

  return data.map((moment) => ({
    id: moment.id,
    planId: moment.plan_id,
    title: moment.title,
    momentDate: DateTime.fromISO(moment.moment_date).toJSDate(),
    memo: moment.memo,
    momentImage: moment.moment_image || undefined,
    writer: moment.User
      ? {
          writerUserId: moment.User.user_id,
          writerNickName: moment.User.nickname || undefined,
          writerImage: moment.User.profile_image || undefined,
        }
      : undefined,
  }));
};

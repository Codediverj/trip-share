import { SupabaseClient } from "@supabase/supabase-js";
import { User } from "./user.types";
import { DateTime } from "luxon";
import { Database } from "@/supabase.types";

export const getUser = async (
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<User> => {
  const { data, error } = await supabase
    .from("User")
    .select("created_at, user_id, profile_image, nickname, email, traveler_code")
    .eq("user_id", userId)
    .single();
  if (error) throw error;

  return {
    userId: data.user_id,
    nickname: data.nickname,
    profileImage: data.profile_image,
    createdAt: DateTime.fromISO(data.created_at).toJSDate(),
    email: data.email,
    travelerCode: data.traveler_code,
  };
};

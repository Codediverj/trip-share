import { SupabaseClient } from "@supabase/supabase-js";
import { Plan } from "./plan.types";
import { DateTime } from "luxon";
import { FriendsList } from "./FriendsList.types";
import { supabase } from "@supabase/auth-ui-shared";
import { PlanDataStore } from "@/contexts/planData/planData.types";
import { Database } from "@/supabase.types";

export const getPlan = async (
  supabase: SupabaseClient<Database>,
  planId: string
): Promise<Plan> => {
  const { data, error } = await supabase
    .from("Plan")
    .select("plan_id, title, start_date, end_date, background_image, currency")
    .eq("plan_id", planId)
    .single();
  if (error) throw error;

  return {
    planId: data.plan_id,
    title: data.title,
    startDate: DateTime.fromISO(data.start_date).toJSDate(),
    endDate: DateTime.fromISO(data.end_date).toJSDate(),
    backgroundImage: data.background_image || undefined,
    currency: data.currency,
  };
};

export const listPlan = async (
  supabase: SupabaseClient<Database>,
  userId: string
): Promise<Plan[]> => {
  const { data, error } = await supabase
    .from("People_Join")
    .select("Plan(plan_id, title, start_date, end_date, background_image, currency)")
    .eq("user_id", userId);
  if (error) throw error;

  // return data.map((d: {Plan: any}) => {
  //   const plan = d.Plan;
  return data.map(({ Plan: plan }: { Plan: any }) => {
    return {
      planId: plan.plan_id,
      title: plan.title,
      startDate: DateTime.fromISO(plan.start_date).toJSDate(),
      endDate: DateTime.fromISO(plan.end_date).toJSDate(),
      backgroundImage: plan.background_image || undefined,
      currency: plan.currency,
    };
  });
};

export const getFriends = async (
  supabase: SupabaseClient<Database>,
  planId: string
): Promise<FriendsList[]> => {
  const { data, error } = await supabase
    .from("People_Join")
    .select("User(*)")
    .eq("plan_id", planId);

  /**
   * SELECT * FROM People_Join pj
   * JOIN User u ON u.user_id = pj.user_id
   * WHERE pj.plan_id = "planId"
   */
  if (error) throw error;

  return data.map(({ User: user }: any) => {
    return {
      userId: user.user_id,
      profileImage: user.profile_image,
      nickname: user.nickname,
      travelerCode: user.traveler_code,
    };
  });
};

export const searchIdByCode = async (
  supabase: SupabaseClient<Database>,
  travelerCode: string
): Promise<string> => {
  const { data, error } = await supabase
    .from("User")
    .select("user_id")
    .eq("traveler_code", travelerCode)
    .single();
  if (error) throw error;

  return data.user_id;
};

export const getAllPlanDetail = async (
  supabase: SupabaseClient<Database>,
  planId: string
): Promise<PlanDataStore> => {
  const { data, error } = await supabase
    .from("Plan")
    .select("*, People_Join(*, User(*))")
    .eq("plan_id", planId)
    .single();
  if (error) throw error;

  //console.log(data);
  return {
    planId: data.plan_id,
    title: data.title,
    startDate: DateTime.fromISO(data.start_date).toJSDate(),
    endDate: DateTime.fromISO(data.end_date).toJSDate(),
    backgroundImage: data.background_image || undefined,
    currency: data.currency,
    peopleJoin: data.People_Join.map((pj) => ({
      userId: pj.user_id,
      nickname: pj.User!.nickname || undefined,
      profileImage: pj.User!.profile_image || undefined,
      email: pj.User!.email || undefined,
      travelerCode: pj.User!.traveler_code,
    })),

    // People_Join: [
    //   {
    //     User: [
    //       {
    //         userId: data.People_Join.user_id,
    //         nickname: data.People_Join.nickname,
    //         profileImage: data.People_Join.profile_image,
    //         createdAt: data.People_Join.created_at,
    //         email: data.People_Join.email,
    //         travelerCode: data.People_Join.traveler_code,
    //       },
    //     ],
    //     planId: data.People_Join.plan_id,
    //     userId: data.People_Join.user_id,
    //   },
    // ],
  };

  //{ ...data, planId: data.plan_id, startDate: DateTime.fromISO(data.start_date).toJSDate() };
};

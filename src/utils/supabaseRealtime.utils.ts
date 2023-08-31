import { Database } from "@/supabase.types";
import {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
  SupabaseClient,
} from "@supabase/supabase-js";
import { v4 } from "uuid";

export const subscribeToChannel = (
  supabaseClient: SupabaseClient<Database>,
  payloadHandler: (payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => void,
  tableName?: string
): RealtimeChannel => {
  return supabaseClient
    .channel(`change_in_${v4()}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: tableName || "*" },
      payloadHandler
    )
    .subscribe();
};

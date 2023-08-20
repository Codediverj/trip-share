import {
  RealtimeChannel,
  RealtimePostgresChangesPayload,
  SupabaseClient,
} from "@supabase/supabase-js";

export const subscribeToChannel = (
  supabaseClient: SupabaseClient,
  payloadHandler: (payload: RealtimePostgresChangesPayload<{ [key: string]: any }>) => void,
  tableName?: string
): RealtimeChannel => {
  return supabaseClient
    .channel(`change_in_${tableName || "all"}`)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: tableName || "*" },
      payloadHandler
    )
    .subscribe();
};

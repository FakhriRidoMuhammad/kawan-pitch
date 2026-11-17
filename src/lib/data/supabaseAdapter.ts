import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { DataAdapter, DataRecord } from "./types";

const TABLE = "records";
let client: SupabaseClient | null = null;

function db() {
  if (!client) {
    const url = import.meta.env.VITE_SUPABASE_URL;
    const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error(
        "VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY wajib diisi jika VITE_DATA_SOURCE=supabase.",
      );
    }
    client = createClient(url, key);
  }
  return client;
}

function unwrap<T>(result: { data: T | null; error: { message: string } | null }): T {
  if (result.error) throw new Error(`Supabase: ${result.error.message}`);
  return result.data as T;
}

export const supabaseAdapter: DataAdapter = {
  source: "supabase",

  async list(kind) {
    let query = db().from(TABLE).select("*").order("created_at", { ascending: false });
    if (kind) query = query.eq("kind", kind);
    return unwrap<DataRecord[]>(await query);
  },

  async get(id) {
    return unwrap<DataRecord | null>(
      await db().from(TABLE).select("*").eq("id", id).maybeSingle(),
    );
  },

  async insert(row) {
    return unwrap<DataRecord>(
      await db()
        .from(TABLE)
        .insert({
          kind: row.kind,
          payload: row.payload,
          review_status: row.review_status ?? "pending",
          reviewed_by: row.reviewed_by ?? null,
        })
        .select()
        .single(),
    );
  },

  async update(id, patch) {
    return unwrap<DataRecord>(
      await db().from(TABLE).update(patch).eq("id", id).select().single(),
    );
  },

  async remove(id) {
    unwrap(await db().from(TABLE).delete().eq("id", id));
  },
};

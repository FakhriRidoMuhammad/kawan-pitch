import { mockAdapter } from "./mockAdapter";
import { supabaseAdapter } from "./supabaseAdapter";
import type { DataAdapter } from "./types";

export * from "./types";

/**
 * Satu-satunya pintu ke data. Halaman memanggil `data.list()`, `data.insert()`, dan seterusnya.
 * `VITE_DATA_SOURCE=supabase` mengalihkan semua panggilan ke Supabase. Default: mock.
 */
export const data: DataAdapter =
  import.meta.env.VITE_DATA_SOURCE === "supabase" ? supabaseAdapter : mockAdapter;

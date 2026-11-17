export type ReviewStatus = "pending" | "approved" | "edited" | "rejected";

/** Satu baris data generik. `kind` membedakan jenis data (misal "kuitansi", "catatan"). */
export interface DataRecord<T = any> {
  id: string;
  kind: string;
  payload: T;
  review_status: ReviewStatus;
  reviewed_by: string | null;
  created_at: string;
}

export type NewRecord<T = any> = Pick<DataRecord<T>, "kind" | "payload"> &
  Partial<Pick<DataRecord<T>, "review_status" | "reviewed_by">>;

export interface DataAdapter {
  /** Nama sumber data. Badge di header menampilkan nilai ini. */
  source: "mock" | "supabase";
  list<T = any>(kind?: string): Promise<DataRecord<T>[]>;
  get<T = any>(id: string): Promise<DataRecord<T> | null>;
  insert<T = any>(row: NewRecord<T>): Promise<DataRecord<T>>;
  update<T = any>(id: string, patch: Partial<Omit<DataRecord<T>, "id">>): Promise<DataRecord<T>>;
  remove(id: string): Promise<void>;
  /** Hanya adapter mock: mengembalikan data ke isi mock/records.json. */
  reset?(): Promise<void>;
}

import seed from "@mock/records.json";
import type { DataAdapter, DataRecord } from "./types";

const KEY = "prototype.records.v1";

function read(): DataRecord[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // localStorage bisa kosong atau diblokir. Pakai data awal.
  }
  return structuredClone(seed) as DataRecord[];
}

function write(rows: DataRecord[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(rows));
  } catch {
    // Abaikan: data tetap ada di memori sampai halaman dimuat ulang.
  }
}

export const mockAdapter: DataAdapter = {
  source: "mock",

  async list(kind) {
    const rows = read();
    const filtered = kind ? rows.filter((r) => r.kind === kind) : rows;
    return filtered.sort((a, b) => b.created_at.localeCompare(a.created_at));
  },

  async get(id) {
    return read().find((r) => r.id === id) ?? null;
  },

  async insert(row) {
    const record: DataRecord = {
      id: crypto.randomUUID(),
      kind: row.kind,
      payload: row.payload,
      review_status: row.review_status ?? "pending",
      reviewed_by: row.reviewed_by ?? null,
      created_at: new Date().toISOString(),
    };
    write([record, ...read()]);
    return record;
  },

  async update(id, patch) {
    const rows = read();
    const index = rows.findIndex((r) => r.id === id);
    if (index < 0) throw new Error(`Data dengan id ${id} tidak ada.`);
    rows[index] = { ...rows[index], ...patch };
    write(rows);
    return rows[index];
  },

  async remove(id) {
    write(read().filter((r) => r.id !== id));
  },

  async reset() {
    localStorage.removeItem(KEY);
  },
};

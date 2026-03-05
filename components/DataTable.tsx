"use client";
import { useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  setFilter,
  setPage,
  setPageSize,
  setSort,
} from "@/lib/slices/dataSlice";
import { addRow, deleteRow } from "@/lib/slices/dataSlice";

export default function DataTable() {
  const dispatch = useAppDispatch();
  const { rows, filter, sortKey, sortDir, page, pageSize } = useAppSelector(
    (s) => s.data
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Viewer");
  const [status, setStatus] = useState<"Active" | "Pending" | "Suspended">("Active");

  const processed = useMemo(() => {
    let r = [...rows];
    if (filter.trim()) {
      const f = filter.toLowerCase();
      r = r.filter(
        (row) =>
          row.name.toLowerCase().includes(f) ||
          row.email.toLowerCase().includes(f) ||
          row.role.toLowerCase().includes(f) ||
          row.status.toLowerCase().includes(f)
      );
    }
    if (sortKey) {
      const key = sortKey;
      r.sort((a, b) => {
        const av = a[key];
        const bv = b[key];
        if (av < bv) return sortDir === "asc" ? -1 : 1;
        if (av > bv) return sortDir === "asc" ? 1 : -1;
        return 0;
      });
    }
    const total = r.length;
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const pageRows = r.slice(start, end);
    return { total, pageRows };
  }, [rows, filter, sortKey, sortDir, page, pageSize]);

  const totalPages = Math.max(1, Math.ceil(processed.total / pageSize));

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          placeholder="Search..."
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
          className="w-full rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 sm:max-w-xs"
        />
        <div className="flex items-center gap-2">
          <label className="text-sm text-zinc-400">Rows</label>
          <select
            value={pageSize}
            onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
            className="rounded-md border border-zinc-700 bg-zinc-900 p-2 text-zinc-100"
          >
            {[5, 8, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 placeholder-zinc-500" />
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 placeholder-zinc-500" />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-md border border-zinc-700 bg-zinc-900 p-2 text-zinc-100">
          {["Admin","Manager","Editor","Viewer"].map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="rounded-md border border-zinc-700 bg-zinc-900 p-2 text-zinc-100">
          {["Active","Pending","Suspended"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button
          onClick={() => {
            if (!name || !email) return;
            dispatch(addRow({ name, email, role, status }));
            setName(""); setEmail("");
          }}
          className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 hover:bg-zinc-800"
        >
          Add
        </button>
      </div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-800 text-zinc-300">
            <tr>
              <th className="cursor-pointer px-3 py-2" onClick={() => dispatch(setSort({ key: "id" }))}>
                ID
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => dispatch(setSort({ key: "name" }))}>
                Name
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => dispatch(setSort({ key: "email" }))}>
                Email
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => dispatch(setSort({ key: "role" }))}>
                Role
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => dispatch(setSort({ key: "status" }))}>
                Status
              </th>
              <th className="cursor-pointer px-3 py-2" onClick={() => dispatch(setSort({ key: "createdAt" }))}>
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {processed.pageRows.map((row) => (
              <tr key={row.id} className="border-t border-zinc-800">
                <td className="px-3 py-2 text-zinc-100">{row.id}</td>
                <td className="px-3 py-2 text-zinc-100">{row.name}</td>
                <td className="px-3 py-2 text-zinc-100">{row.email}</td>
                <td className="px-3 py-2 text-zinc-100">{row.role}</td>
                <td className="px-3 py-2 text-zinc-100">
                  <span
                    className={
                      row.status === "Active"
                        ? "rounded bg-emerald-500/20 px-2 py-1 text-emerald-400"
                        : row.status === "Pending"
                        ? "rounded bg-amber-500/20 px-2 py-1 text-amber-400"
                        : "rounded bg-rose-500/20 px-2 py-1 text-rose-400"
                    }
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-3 py-2 text-zinc-100">{row.createdAt}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => dispatch(deleteRow(row.id))}
                    className="rounded-md border border-zinc-700 px-2 py-1 text-zinc-100 hover:bg-zinc-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <div className="text-sm text-zinc-400">
          Page {page} of {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded border border-zinc-700 px-3 py-1 text-zinc-100 hover:bg-zinc-800 disabled:opacity-50"
            disabled={page <= 1}
            onClick={() => dispatch(setPage(page - 1))}
          >
            Prev
          </button>
          <button
            className="rounded border border-zinc-700 px-3 py-1 text-zinc-100 hover:bg-zinc-800 disabled:opacity-50"
            disabled={page >= totalPages}
            onClick={() => dispatch(setPage(page + 1))}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

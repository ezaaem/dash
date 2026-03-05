"use client";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setClients, addClient, deleteClient } from "@/lib/slices/clientsSlice";
import { mockClients } from "@/lib/mock";
import { Pie, PieChart, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { exportToPDF, exportToXLSX } from "@/lib/export";

const colors = ["#ef4444", "#3b82f6", "#f59e0b", "#10b981", "#8b5cf6", "#22c55e", "#06b6d4"];

export default function ClientsPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.clients.items);
  const [name, setName] = useState("");
  const [country, setCountry] = useState("US");
  const [spending, setSpending] = useState<number>(100);

  useEffect(() => {
    if (!items.length) dispatch(setClients(mockClients()));
  }, [dispatch, items.length]);

  const byCountry = useMemo(() => {
    const map: Record<string, number> = {};
    items.forEach((c) => {
      map[c.country] = (map[c.country] ?? 0) + 1;
    });
    return Object.entries(map).map(([country, value]) => ({ country, value }));
  }, [items]);

  return (
    <div className="p-4">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <div className="mb-2 text-lg font-semibold text-zinc-100">Clients by Country</div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={byCountry} dataKey="value" nameKey="country" outerRadius={100}>
                {byCountry.map((_, i) => (
                  <Cell key={i} fill={colors[i % colors.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "#f0f0f2", border: "1px solid #27272a", color: "#e4e4e7" }} />
              <Legend wrapperStyle={{ color: "#e4e4e7" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-[1fr_1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 placeholder-zinc-500" />
          <select value={country} onChange={(e) => setCountry(e.target.value)} className="rounded-md border border-zinc-700 bg-zinc-900 p-2 text-zinc-100">
            {["US","UK","DE","FR","CA","JP","IN"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="number" value={spending} onChange={(e) => setSpending(Number(e.target.value))} placeholder="Spending" className="rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 placeholder-zinc-500" />
          <button
            onClick={() => {
              if (!name) return;
              dispatch(addClient({ name, country, spending }));
              setName("");
            }}
            className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 hover:bg-zinc-800"
          >
            Add
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToPDF(items, [
              { key: "id", label: "ID" },
              { key: "name", label: "Name" },
              { key: "country", label: "Country" },
              { key: "spending", label: "Spending" },
            ], "clients")}
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 hover:bg-zinc-800"
          >
            Export PDF
          </button>
          <button
            onClick={() => exportToXLSX(items, [
              { key: "id", label: "ID" },
              { key: "name", label: "Name" },
              { key: "country", label: "Country" },
              { key: "spending", label: "Spending" },
            ], "clients")}
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 hover:bg-zinc-800"
          >
            Export Excel
          </button>
        </div>
      </div>
      <div className="mt-2 overflow-x-auto rounded-lg border border-zinc-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-800 text-zinc-300">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Country</th>
              <th className="px-3 py-2">Spending</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 80).map((c) => (
              <tr key={c.id} className="border-t border-zinc-800">
                <td className="px-3 py-2">{c.id}</td>
                <td className="px-3 py-2">{c.name}</td>
                <td className="px-3 py-2">{c.country}</td>
                <td className="px-3 py-2">${c.spending}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => dispatch(deleteClient(c.id))}
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
    </div>
  );
}

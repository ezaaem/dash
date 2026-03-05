"use client";
import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setOrders, addOrder, deleteOrder } from "@/lib/slices/ordersSlice";
import { mockOrders } from "@/lib/mock";
import { exportToPDF, exportToXLSX } from "@/lib/export";

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.orders.items);
  const [status, setStatus] = useState<string>("All");

  useEffect(() => {
    if (!items.length) dispatch(setOrders(mockOrders()));
  }, [dispatch, items.length]);

  const filtered = useMemo(() => {
    if (status === "All") return items;
    return items.filter((o) => o.status === status);
  }, [items, status]);

  return (
    <div className="p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <label className="text-sm text-zinc-300">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border border-zinc-700 bg-zinc-900 p-2 text-zinc-100"
        >
          {["All", "Pending", "Shipped", "Delivered", "Cancelled"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() =>
              exportToPDF(items, [
                { key: "id", label: "ID" },
                { key: "client", label: "Client" },
                { key: "status", label: "Status" },
                { key: "total", label: "Total" },
                { key: "date", label: "Date" },
              ], "orders")
            }
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 hover:bg-zinc-800"
          >
            Export PDF
          </button>
          <button
            onClick={() =>
              exportToXLSX(items, [
                { key: "id", label: "ID" },
                { key: "client", label: "Client" },
                { key: "status", label: "Status" },
                { key: "total", label: "Total" },
                { key: "date", label: "Date" },
              ], "orders")
            }
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 hover:bg-zinc-800"
          >
            Export Excel
          </button>
        </div>
      </div>
      <div className="mb-3 grid gap-2 sm:grid-cols-[1fr_1fr_1fr_1fr_auto]">
        <input placeholder="Client" id="client" onKeyDown={() => {}} className="rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 placeholder-zinc-500" />
        <select id="statusSel" className="rounded-md border border-zinc-700 bg-zinc-900 p-2 text-zinc-100">
          {["Pending", "Shipped", "Delivered", "Cancelled"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input type="number" placeholder="Total" id="total" className="rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 placeholder-zinc-500" />
        <input type="date" id="date" className="rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 placeholder-zinc-500" />
        <button
          onClick={() => {
            const client = (document.getElementById("client") as HTMLInputElement).value;
            const status = (document.getElementById("statusSel") as HTMLSelectElement).value as any;
            const total = Number((document.getElementById("total") as HTMLInputElement).value || "0");
            const date = (document.getElementById("date") as HTMLInputElement).value || new Date().toISOString().slice(0, 10);
            if (!client) return;
            dispatch(addOrder({ client, status, total, date }));
            (document.getElementById("client") as HTMLInputElement).value = "";
            (document.getElementById("total") as HTMLInputElement).value = "";
          }}
          className="rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 hover:bg-zinc-800"
        >
          Add
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-zinc-800">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-zinc-800 text-zinc-300">
            <tr>
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Client</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Total</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.slice(0, 120).map((o) => (
              <tr key={o.id} className="border-t border-zinc-800">
                <td className="px-3 py-2">{o.id}</td>
                <td className="px-3 py-2">{o.client}</td>
                <td className="px-3 py-2">{o.status}</td>
                <td className="px-3 py-2">${o.total}</td>
                <td className="px-3 py-2">{o.date}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => dispatch(deleteOrder(o.id))}
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

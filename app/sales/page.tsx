"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setSales } from "@/lib/slices/salesSlice";
import { mockSales } from "@/lib/mock";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

export default function SalesPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.sales.items);

  useEffect(() => {
    if (!items.length) dispatch(setSales(mockSales()));
  }, [dispatch, items.length]);

  return (
    <div className="grid gap-4 p-4 lg:grid-cols-2">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <div className="mb-2 text-lg font-semibold text-zinc-100">Revenue by Month</div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={items}>
              <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#a1a1aa" tick={{ fill: "#e4e4e7", fontSize: 12 }} />
              <YAxis stroke="#a1a1aa" tick={{ fill: "#e4e4e7", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a", color: "#e4e4e7" }} />
              <Legend wrapperStyle={{ color: "#e4e4e7" }} />
              <Line type="monotone" dataKey="revenue" stroke="#a855f7" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <div className="mb-2 text-lg font-semibold text-zinc-100">Orders by Month</div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={items}>
              <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#a1a1aa" tick={{ fill: "#e4e4e7", fontSize: 12 }} />
              <YAxis stroke="#a1a1aa" tick={{ fill: "#e4e4e7", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a", color: "#e4e4e7" }} />
              <Legend wrapperStyle={{ color: "#e4e4e7" }} />
              <Bar dataKey="orders" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

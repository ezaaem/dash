"use client";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from "recharts";
import { useAppSelector } from "@/lib/hooks";
import { useMemo } from "react";

export default function ChartPanel() {
  const rows = useAppSelector((s) => s.data.rows);
  const data = useMemo(() => {
    const byMonth: Record<
      string,
      Record<"Active" | "Pending" | "Suspended", number>
    > = {};
    for (const r of rows) {
      const m = r.createdAt.slice(0, 7);
      if (!byMonth[m]) byMonth[m] = { Active: 0, Pending: 0, Suspended: 0 };
      byMonth[m][r.status] += 1;
    }
    return Object.entries(byMonth)
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([month, v]) => ({ month, ...v }));
  }, [rows]);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="mb-2 text-lg font-semibold text-zinc-100">Sales Overview</div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
            <XAxis dataKey="month" stroke="#a1a1aa" tick={{ fill: "#e4e4e7", fontSize: 12 }} />
            <YAxis allowDecimals={false} stroke="#a1a1aa" tick={{ fill: "#e4e4e7", fontSize: 12 }} />
            <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a", color: "#e4e4e7" }} />
            <Legend wrapperStyle={{ color: "#e4e4e7" }} />
            <Area type="monotone" dataKey="Active" stroke="#9333ea" fill="url(#g1)" />
            <Area type="monotone" dataKey="Pending" stroke="#d97706" fill="url(#g2)" />
            <Area type="monotone" dataKey="Suspended" stroke="#dc2626" fill="url(#g3)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

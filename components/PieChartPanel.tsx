"use client";
import { Pie, PieChart, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Smartphones", value: 30, color: "#ef4444" },
  { name: "Laptops", value: 25, color: "#3b82f6" },
  { name: "Furniture", value: 18, color: "#f59e0b" },
  { name: "Gaming Accessories", value: 13, color: "#8b5cf6" },
  { name: "Beauty & Personal Care", value: 15, color: "#10b981" },
];

export default function PieChartPanel() {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="mb-2 text-lg font-semibold text-zinc-100">Category Distribution</div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={100}>
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
              <Tooltip contentStyle={{ background: "#f0f0f2", border: "1px solid #27272a", color: "#e4e4e7" }} />
            <Legend wrapperStyle={{ color: "#e4e4e7" }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

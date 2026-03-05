"use client";
type Props = {
  title: string;
  value: string | number;
  icon?: string;
};

export default function StatCard({ title, value, icon }: Props) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
      <div className="mb-2 flex items-center justify-between text-zinc-400">
        <div className="text-sm">{title}</div>
        {icon ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d={icon} />
          </svg>
        ) : null}
      </div>
      <div className="text-2xl font-semibold text-zinc-100">{value}</div>
    </div>
  );
}

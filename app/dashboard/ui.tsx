"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/slices/authSlice";
import { setRows } from "@/lib/slices/dataSlice";
import { mockRows } from "@/lib/mock";
import DataTable from "@/components/DataTable";
import ChartPanel from "@/components/ChartPanel";
import ExportButtons from "@/components/ExportButtons";
import StatCard from "@/components/StatCard";
import PieChartPanel from "@/components/PieChartPanel";

export default function DashboardClient() {
  const dispatch = useAppDispatch();
  const total = useAppSelector((s) => s.data.rows.length);
  const router = useRouter();

  useEffect(() => {
    dispatch(setRows(mockRows()));
  }, [dispatch]);

  const onLogout = () => {
    dispatch(logout());
    document.cookie = "authToken=; Max-Age=0; path=/";
    router.replace("/login");
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Sales" value="$182,450" icon="M3 12h18M12 3v18" />
        <StatCard title="Total Clients" value="1,437" icon="M12 12a4 4 0 100-8 4 4 0 000 8z" />
        <StatCard title="Total Products" value="674" icon="M4 6h16v12H4z" />
        <StatCard title="Stock" value="12,845" icon="M6 4h12v4H6z" />
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartPanel />
        <PieChartPanel />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg font-semibold">Users</div>
        <ExportButtons />
      </div>
      <div className="mt-3">
        <DataTable />
      </div>
    </>
  );
}

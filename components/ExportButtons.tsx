"use client";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { useAppSelector } from "@/lib/hooks";
import { useMemo } from "react";

export default function ExportButtons() {
  const { rows, filter, sortKey, sortDir } = useAppSelector((s) => s.data);

  const filteredSorted = useMemo(() => {
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
    return r;
  }, [rows, filter, sortKey, sortDir]);

  const exportPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["ID", "Name", "Email", "Role", "Status", "Created"]],
      body: filteredSorted.map((r) => [
        r.id,
        r.name,
        r.email,
        r.role,
        r.status,
        r.createdAt,
      ]),
      theme: "grid",
      styles: { fontSize: 8 },
      headStyles: { fillColor: [0, 0, 0] },
      startY: 10,
    });
    doc.save("table.pdf");
  };

  const exportXLSX = () => {
    const ws = XLSX.utils.json_to_sheet(
      filteredSorted.map((r) => ({
        ID: r.id,
        Name: r.name,
        Email: r.email,
        Role: r.role,
        Status: r.status,
        Created: r.createdAt,
      }))
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    XLSX.writeFile(wb, "table.xlsx");
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={exportPDF}
        className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 hover:bg-zinc-800"
      >
        Export PDF
      </button>
      <button
        onClick={exportXLSX}
        className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 hover:bg-zinc-800"
      >
        Export Excel
      </button>
    </div>
  );
}

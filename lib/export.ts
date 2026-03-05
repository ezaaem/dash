import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export type Column = { key: string; label: string };

export function exportToPDF(rows: any[], columns: Column[], filename: string) {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [columns.map((c) => c.label)],
    body: rows.map((r) => columns.map((c) => r[c.key])),
    theme: "grid",
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 0, 0] },
    startY: 10,
  });
  doc.save(filename.endsWith(".pdf") ? filename : `${filename}.pdf`);
}

export function exportToXLSX(rows: any[], columns: Column[], filename: string) {
  const data = rows.map((r) =>
    Object.fromEntries(columns.map((c) => [c.label, r[c.key]]))
  );
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Data");
  XLSX.writeFile(wb, filename.endsWith(".xlsx") ? filename : `${filename}.xlsx`);
}

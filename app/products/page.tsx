"use client";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setProducts, addProduct, deleteProduct } from "@/lib/slices/productsSlice";
import { mockProducts } from "@/lib/mock";
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";
import { exportToPDF, exportToXLSX } from "@/lib/export";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector((s) => s.products.items);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Smartphones");
  const [price, setPrice] = useState<number>(199);
  const [stock, setStock] = useState<number>(10);

  useEffect(() => {
    if (!items.length) dispatch(setProducts(mockProducts()));
  }, [dispatch, items.length]);

  const byCategory = useMemo(() => {
    const map: Record<string, { category: string; stock: number }> = {};
    items.forEach((p) => {
      if (!map[p.category]) map[p.category] = { category: p.category, stock: 0 };
      map[p.category].stock += p.stock;
    });
    return Object.values(map);
  }, [items]);

  return (
    <div className="p-4">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <div className="mb-2 text-lg font-semibold text-zinc-100">Stock by Category</div>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byCategory}>
              <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
              <XAxis dataKey="category" stroke="#a1a1aa" tick={{ fill: "#e4e4e7", fontSize: 12 }} />
              <YAxis stroke="#a1a1aa" tick={{ fill: "#e4e4e7", fontSize: 12 }} />
              <Tooltip contentStyle={{ background: "#18181b", border: "1px solid #27272a", color: "#e4e4e7" }} />
              <Legend wrapperStyle={{ color: "#e4e4e7" }} />
              <Bar dataKey="stock" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 placeholder-zinc-500" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-md border border-zinc-700 bg-zinc-900 p-2 text-zinc-100">
            {["Smartphones","Laptops","Furniture","Gaming","Beauty"].map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="Price" className="rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 placeholder-zinc-500" />
          <input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} placeholder="Stock" className="rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 placeholder-zinc-500" />
          <button
            onClick={() => {
              if (!name) return;
              dispatch(addProduct({ name, category, price, stock }));
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
              { key: "category", label: "Category" },
              { key: "price", label: "Price" },
              { key: "stock", label: "Stock" },
            ], "products")}
            className="rounded border border-zinc-700 bg-zinc-900 px-3 py-2 text-zinc-100 hover:bg-zinc-800"
          >
            Export PDF
          </button>
          <button
            onClick={() => exportToXLSX(items, [
              { key: "id", label: "ID" },
              { key: "name", label: "Name" },
              { key: "category", label: "Category" },
              { key: "price", label: "Price" },
              { key: "stock", label: "Stock" },
            ], "products")}
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
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Stock</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.slice(0, 50).map((p) => (
              <tr key={p.id} className="border-t border-zinc-800">
                <td className="px-3 py-2">{p.id}</td>
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2">{p.category}</td>
                <td className="px-3 py-2">${p.price}</td>
                <td className="px-3 py-2">{p.stock}</td>
                <td className="px-3 py-2">
                  <button
                    onClick={() => dispatch(deleteProduct(p.id))}
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

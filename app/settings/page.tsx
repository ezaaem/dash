"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateUser } from "@/lib/slices/authSlice";

export default function SettingsPage() {
  const user = useAppSelector((s) => s.auth.user);
  const products = useAppSelector((s) => s.products.items.length);
  const clients = useAppSelector((s) => s.clients.items.length);
  const orders = useAppSelector((s) => s.orders.items.length);
  const dispatch = useAppDispatch();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [saved, setSaved] = useState(false);

  const onSave = () => {
    dispatch(updateUser({ name, email }));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <div className="mb-3 text-lg font-semibold text-zinc-100">Profile</div>
        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-zinc-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-zinc-700 bg-zinc-950 p-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
          </div>
          <button
            onClick={onSave}
            className="rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-zinc-100 hover:bg-zinc-700"
          >
            Save
          </button>
          {saved ? <div className="text-sm text-emerald-400">Saved</div> : null}
        </div>
      </div>
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">
        <div className="mb-3 text-lg font-semibold text-zinc-100">Overview</div>
        <ul className="space-y-2 text-zinc-200">
          <li>
            <span className="text-zinc-400">User ID:</span> {user?.id ?? "-"}
          </li>
          <li>
            <span className="text-zinc-400">Products:</span> {products}
          </li>
          <li>
            <span className="text-zinc-400">Clients:</span> {clients}
          </li>
          <li>
            <span className="text-zinc-400">Orders:</span> {orders}
          </li>
        </ul>
      </div>
    </div>
  );
}

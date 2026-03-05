"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Shell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-dvh bg-zinc-950 text-zinc-50 md:grid md:grid-cols-[64px_1fr] lg:grid-cols-[240px_1fr]">
      <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} onMobileToggle={() => setMobileOpen((v) => !v)} />
      <div className="relative flex min-h-dvh flex-col">
        <Topbar onMobileToggle={() => setMobileOpen((v) => !v)} />
        <main className="mx-auto w-full max-w-7xl p-4">{children}</main>
      </div>
      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}
    </div>
  );
}

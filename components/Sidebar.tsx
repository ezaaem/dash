"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";

export default function Sidebar({
  mobileOpen,
  onMobileClose,
  onMobileToggle,
}: {
  mobileOpen: boolean;
  onMobileClose: () => void;
  onMobileToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <>      
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 transform bg-zinc-900 p-3 transition-transform md:static md:w-16 md:translate-x-0 lg:w-60 ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="mb-4 flex items-center justify-between px-2 text-zinc-100">
          <button
            aria-label="Toggle sidebar"
            onClick={onMobileToggle}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-zinc-200"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h12M3 18h18" />
            </svg>
          </button>
        </div>
        <nav className="space-y-1">
          {NAV_ITEMS.map((it) => {
            const active = pathname === it.href || (it.href !== "/dashboard" && it.href !== "#" && pathname.startsWith(it.href));
            return (
              <Link
                key={it.label}
                href={it.href === "#" ? "/dashboard" : it.href}
                onClick={onMobileClose}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm ${
                  active ? "bg-zinc-800 text-zinc-100" : "text-zinc-200 hover:bg-zinc-800"
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d={it.icon} />
                </svg>
                <span className={`${mobileOpen ? "inline" : "hidden lg:inline"}`}>{it.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-3 left-0 w-full px-3">
          <div className="flex items-center gap-3 rounded-md bg-zinc-800 p-3">
            <div className="h-8 w-8 rounded-full bg-zinc-700" />
            <div className="hidden flex-1 lg:block">
              <div className="text-sm text-zinc-100">MO EL-sayed</div>
              <div className="text-xs text-zinc-400">Administrator</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: "M3 10l9-7 9 7 M5 21h14V10" },
  { href: "/products", label: "Products", icon: "M4 6h16v12H4z" },
  { href: "/clients", label: "Clients", icon: "M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" },
  { href: "/sales", label: "Sales", icon: "M4 12l4 4 8-8 4 4" },
  { href: "/orders", label: "Orders", icon: "M6 4h12v4H6zm0 6h12v10H6z" },
  { href: "#", label: "Settings", icon: "M12 8a4 4 0 100 8 4 4 0 000-8z" },
  { href: "#", label: "Messages", icon: "M4 6h16v10H5l-1 4z" },
  { href: "#", label: "Notifications", icon: "M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2h16z" },
  { href: "#", label: "Help", icon: "M12 18h.01M9 9a3 3 0 116 0c0 2-3 2-3 4" },
];

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
          {items.map((it) => {
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

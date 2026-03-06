"use client";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/hooks";
import { logout } from "@/lib/slices/authSlice";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/nav";

export default function Topbar({
  onMobileToggle,
}: {
  onMobileToggle?: () => void;
}) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const title =
    NAV_ITEMS.find(
      (n) =>
        pathname === n.href ||
        (n.href !== "/dashboard" &&
          n.href !== "#" &&
          pathname.startsWith(n.href)),
    )?.label ?? "Dashboard";
  const onLogout = () => {
    dispatch(logout());
    document.cookie = "authToken=; Max-Age=0; path=/";
    router.replace("/login");
  };
  return (
    <header className="border-b border-zinc-800 bg-zinc-900">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4">
        <div className="flex items-center gap-2">
          {onMobileToggle ? (
            <button
              aria-label="Toggle menu"
              onClick={onMobileToggle}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-zinc-200 md:hidden"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M3 12h18M3 18h18" />
              </svg>
            </button>
          ) : null}
          <div className="text-zinc-200">{title}</div>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 px-3 text-sm text-zinc-200">
            EN
          </button>
          <button className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 text-zinc-200">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2h16z" />
            </svg>
          </button>
          <div className="hidden items-center gap-2 md:flex">
            <div className="h-9 w-9 rounded-full bg-zinc-700" />
            <div className="text-sm text-zinc-200">MO El-sayed</div>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex h-9 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 px-3 text-sm text-zinc-200"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}

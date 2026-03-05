"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Shell from "./Shell";

export default function AppFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    const hasToken = document.cookie.split("; ").some((c) => c.startsWith("authToken="));
    setAuthed(hasToken);
  }, [pathname]);

  const isLogin = pathname === "/login";
  if (!authed || isLogin) {
    return <>{children}</>;
  }
  return <Shell>{children}</Shell>;
}

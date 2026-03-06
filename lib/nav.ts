export type NavItem = {
  href: string;
  label: string;
  icon: string;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "M3 10l9-7 9 7 M5 21h14V10" },
  { href: "/products", label: "Products", icon: "M4 6h16v12H4z" },
  { href: "/clients", label: "Clients", icon: "M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" },
  { href: "/sales", label: "Sales", icon: "M4 12l4 4 8-8 4 4" },
  { href: "/orders", label: "Orders", icon: "M6 4h12v4H6zm0 6h12v10H6z" },
  { href: "/settings", label: "Settings", icon: "M12 8a4 4 0 100 8 4 4 0 000-8z" },
  { href: "#", label: "Messages", icon: "M4 6h16v10H5l-1 4z" },
  { href: "#", label: "Notifications", icon: "M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-2 2h16z" },
  { href: "#", label: "Help", icon: "M12 18h.01M9 9a3 3 0 116 0c0 2-3 2-3 4" },
];
